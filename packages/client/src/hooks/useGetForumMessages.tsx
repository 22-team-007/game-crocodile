// Hooks
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Api
import api from '../api'

const useGetForumMessages = () => {

  const { pathname } = useLocation()
  const themeId = pathname.split('/').at(-1)

  const [users, setUsers] = useState<UsersType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [messages, setMessages] = useState<ForumRecord[]>([])

  useEffect(() => {
    fetchComments()
  },[])

  function getEmojis(EmojiRecords?: EmojiRecord[]){
    if (!EmojiRecords) return []

    const resultArr: any[] = []

    EmojiRecords.forEach((item) => {
      const { emoji, author_id } = item;
      const foundIndex = resultArr.findIndex((resultItem) => resultItem.emoji === emoji);
      if (foundIndex === -1) {
        resultArr.push({
          emoji,
          users: [author_id],
          count: 1
        });
      } else {
        resultArr[foundIndex].users.push(author_id);
        resultArr[foundIndex].count += 1;
      }
    });

    return resultArr
  }

  // запрос комментариев
  function fetchComments() {
    setLoading(true);
    api.forum.comments(Number(themeId)).then(result => {
      const usersId = new Set<number>;
      
      result.forEach((message, index) => {
        usersId.add(message.author_id)
        const emojis = getEmojis(message.EmojiRecords)
        result[index].emojis = emojis
      })

      // массив запросов для получения изображений пользователей
      const userPromises: Promise<unknown>[] = []
      // объект содержащий в себе key: id пользователя, value: данные пользователя
      const usersObj: UsersType = {}

      // множественный запрос к Апи Яндекса для получения данных пользователей
      usersId.forEach(user => {
        userPromises.push(api.users.get(user).then(value => {
          usersObj[user] = value
        }))
      })

      Promise.all(userPromises).then(() => {
        setUsers(usersObj)
        setMessages(result)
        setLoading(false)
      })
    })
  }

  /**
   * Метод, реализующий создание комментария. Если пользователя, который создает
   * комментарий нет в объекте users, то делается запрос к Апи Яндекса и добавляем
   * данного пользователя в объект для отображения его аватара
   *
   * @param data - данные создаваемого комментария
   */
  const createComment = async (data: Omit<ForumRecord, "id">) => {

    if (!users?.[data.author_id]) {
      await api.users.get(data.author_id).then(value => {
        if (users) {
          users[data.author_id] = value
          setUsers(users)
        } else {
          const usersObj: UsersType = {}
          usersObj[data.author_id] = value
          setUsers(usersObj)
        }
      })
    }

    api.forum.create_comment(data).then((comment) => {
      if (messages) {
        setMessages(prevState => [...prevState, comment])
      } else {
        setMessages([comment])
      }
    })
  }

  /**
   * Метод, реализующий добавление/изменение реакции на комментарий
   * @param data
   */
  const createReaction = async (data: Omit<EmojiRecord, 'id'>) => {
    api.forum.create_reaction(data).then(() => {
      fetchComments()
    })
  }

  return {
    messages,
    users,
    createComment,
    createReaction,
    loading,
  }
}

export default useGetForumMessages
