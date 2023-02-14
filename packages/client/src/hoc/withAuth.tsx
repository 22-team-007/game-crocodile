import type { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'

export default function WithAuth<P extends object>(
  PrivateComponent: ComponentType<P>,
  redirectTo = '/signin',
  invertRule = false
): React.ComponentType | any {
  return function HOC(props: any) {
    let userId = localStorage.getItem('userId')

    if (userId === '0') {
      userId = null
    }

    let isLogin = userId !== null

    if (invertRule) {
      isLogin = !isLogin
    }

    return isLogin ? (
      <PrivateComponent {...props} />
    ) : (
      <Navigate to={redirectTo} />
    )
  }
}
