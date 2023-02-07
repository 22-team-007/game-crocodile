import type { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function WithAuth<P extends object>(
  PrivateComponent: ComponentType<P>,
  pathRedirect = '/signin',
  riderectIfUser = false
): React.ComponentType | any {
  return function HOC(props: any) {
    const navigate = useNavigate()

    useEffect(() => {
      if (typeof riderectIfUser !== 'boolean') {
        riderectIfUser = false
      }

      // пока пользователь захардкожен
      const login = true

      if (login === riderectIfUser) {
        navigate(pathRedirect)
      }
    })

    return <PrivateComponent {...props} />
  }
}
