import { useEffect } from 'react'

const Page = ({title, children}: {title:string, children:JSX.Element}) => {
  useEffect(() => {
    document.title = title || ''
  }, [title])
  return children
}

export default Page
