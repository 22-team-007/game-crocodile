// Hooks
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
// Api
import api from '../api'



const useGetForumTheme = () => {

  const { pathname } = useLocation()
  const themeId = pathname.split('/').at(-1)

  const [loading, setLoading] = useState<boolean>(true)
  const [themeContent, setThemeContent] = useState<Partial<ThemeContentType> | null>()

  useEffect(() => {
    if (loading) {
      api.forum.get(Number(themeId)).then(theme => {

        api.users.get(theme.author_id).then(user => {
          setThemeContent({user, theme})
          setLoading(false)
        })
      })
    }
  }, [])

  const update = (data: ForumRecord) => {
    api.forum.update(data).then(theme => {
      setThemeContent(prevState => ({...prevState, theme}))
    })
  }

  const deleteTheme = async (id: number) => {
    api.forum.delete(id)
      .catch((err) => console.log('Ошибка удаления темы', err.message))
  }

  return {
    themeContent,
    update,
    deleteTheme,
    loading
  }
}

export default useGetForumTheme
