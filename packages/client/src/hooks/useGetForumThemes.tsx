import { useEffect, useState } from 'react'
import api from '../api'

const useGetForumThemes = () => {

  const [themes, setThemes] = useState<ForumList | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (loading) {
      console.log('forum fetch', loading)
      api.forum.list().then(value => {
        setThemes(value)
        setLoading(false)
      }).catch((e) => console.error(e.message))
    }
  }, [])

  return {
    themes,
    loading
  }
}

export default useGetForumThemes
