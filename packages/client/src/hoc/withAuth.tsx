import type { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'

export default function WithAuth<P extends object>(
  PrivateComponent: ComponentType<P>,
  redirectTo = '/signin',
  invertRule = false
): React.ComponentType | unknown {
  return function HOC(props: P) {
    let userId = useAppSelector(state => state.userData.user?.id)

    if (!userId) {
      userId = undefined
    }

    let isLogin = userId !== undefined

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
