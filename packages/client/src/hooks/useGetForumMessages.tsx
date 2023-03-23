import { useLocation } from 'react-router-dom'

import api from '../api'
import { useState } from 'react'

const useGetForumMessages = () => {

  const { pathname } = useLocation()
  const themeId = pathname.split('/').at(-1)

  const [users, setUsers] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)

  const [messages, setMessages] = useState<ForumRecord[]>([])

  if (loading){
    api.forum.comments(Number(themeId)).then(result => {
      const usersId = new Set<number>;
      result.forEach(message => usersId.add(message.author_id))
      setMessages(result)

      const userPromises: Promise<unknown>[] = []
      usersId.forEach(user => {
        userPromises.push(api.users.get(user).then(value => {
          users[user] = value
          setUsers(users)
        }))
      })
      Promise.all(userPromises).then(() => setLoading(false))
    })
  }

  const createComment = async (data: ForumRecord) => {
    api.forum.create_comment(data).then((comment) => {
      if (messages) {
        setMessages(prevState => [...prevState, comment])
      } else {
        setMessages([comment])
      }
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
