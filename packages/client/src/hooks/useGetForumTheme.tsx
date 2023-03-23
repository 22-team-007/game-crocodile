// Hooks
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
// Api
import api from '../api'

interface ThemeContentType {
  theme: ForumRecord,
  user: UserType
}

const useGetForumTheme = () => {

  const { pathname } = useLocation()
  const themeId = pathname.split('/').at(-1)

  const [loading, setLoading] = useState<boolean>(true)
  const [themeContent, setThemeContent] = useState<Partial<ThemeContentType> | null>()

  if (loading) {
    api.forum.get(Number(themeId)).then(theme => {

      api.users.get(theme.author_id).then(user => {
        setThemeContent({user, theme})
        setLoading(false)
      })
    })
  }

  const update = (data: ForumRecord) => {
    api.forum.update(data).then(theme => {
      setThemeContent(prevState => ({...prevState, theme}))
    })
  }

  return {
    themeContent,
    update,
    loading
  }
}

export default useGetForumTheme
