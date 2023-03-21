// import { useLocation } from 'react-router-dom'

import api from '../api'
import { useState } from 'react'

const useGetForumMessages = () => {

  // const { pathname } = useLocation()
  // const themeId = pathname.split('/').at(-1)
  const [users, setUsers] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)

  // mockData
  // todo заменить на данные с бэка как будет готов
  const messages = [
    {
      id: 12,
      parent_id: 1,
      subject: 'test.',
      description: 'Выход игры уже рядом, время обсуждать.',
      author_id: 543281
    },
    {
      id: 13,
      parent_id: 1,
      subject: 'test.',
      description: 'Выход игры уже рядом, время обсуждать.',
      author_id: 74568
    },
    {
      id: 15,
      parent_id: 1,
      subject: 'test.',
      description: `
- Привет
- мир
      `,
      author_id: 35558
    },
    {
      id: 16,
      parent_id: 1,
      subject: 'test.',
      description: `
### Пример кода сортировки пузырьком на JS
~~~js
      function bubbleSortConcept1(arr) {
        for (let j = arr.length - 1; j > 0; j--) {
          for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
            }
          }
        }
      }
~~~
      `,
      author_id: 35558
    }
  ]

  const usersId = new Set<number>
  messages.forEach(message => usersId.add(message.author_id))

  const userPromises: Promise<unknown>[] = []
  usersId.forEach(user => {
    userPromises.push(api.users.get(user).then(value => {
      users[user] = value
      setUsers(users)
    }))
  })
  Promise.all(userPromises).then(() => setLoading(false))

  return {
    messages,
    users,
    loading,
  }
}

export default useGetForumMessages
