import { useState } from 'react'
import api from '../api'

const UseGetForumThemes = () => {

  const [themes, setThemes] = useState<ForumList | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  if (loading) {
    console.log('forum fetch')
    api.forum.list().then(value => {
      setThemes(value)
      setLoading(false)
    }).catch((e) => console.error(e.message))
  }

  return {
    themes,
    loading
  }
}

export default UseGetForumThemes
