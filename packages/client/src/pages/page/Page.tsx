import { useEffect } from 'react'

const Page = (props: any) => {
  useEffect(() => {
    document.title = props.title || ''
  }, [props.title])
  return props.children
}

export default Page
