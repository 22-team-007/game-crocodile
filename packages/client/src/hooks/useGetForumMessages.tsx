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

  const [messages, setMessages] = useState<CommentRecord[]>([])

  useEffect(() => {
    fetchComments()
  },[])

  // запрос комментариев
  function fetchComments() {
    setLoading(true);
    api.forum.comments(Number(themeId)).then(result => {
      const usersId = new Set<number>;
      
      result.forEach((message) => usersId.add(message.author_id))

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
        setMessages(prevState => [...prevState, (comment as CommentRecord)])
      } else {
        setMessages([(comment as CommentRecord)])
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
