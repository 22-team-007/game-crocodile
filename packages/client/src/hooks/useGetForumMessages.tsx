// Hooks
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Api
import api from '../api'

type UsersType = Record<number, UserType>

const useGetForumMessages = () => {

  const { pathname } = useLocation()
  const themeId = pathname.split('/').at(-1)

  const [users, setUsers] = useState<UsersType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [messages, setMessages] = useState<ForumRecord[]>([])

  useEffect(() => {
    fetchComments()
  },[])

  function fetchComments() {
    setLoading(true);
    api.forum.comments(Number(themeId)).then(result => {
      const usersId = new Set<number>;
      result.forEach(message => usersId.add(message.author_id))


      const userPromises: Promise<unknown>[] = []
      const usersObj: UsersType = {}

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

  const createComment = async (data: ForumRecord) => {

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

  const createReaction = async (data: EmojiRecord) => {
    api.forum.create_reaction(data).then(() => {
      fetchComments()
    })
  }

  return {
    messages,
    users,
    createComment,
    loading,
  }
}

export default useGetForumMessages
