import type { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'

export default function WithAuth<P extends object>(
  PrivateComponent: ComponentType<P>,
  redirectTo = '/signin'
): React.ComponentType | any {
  return function HOC(props: any) {
    const login = Math.random() < 0.5

    return login ? (
      <PrivateComponent {...props} />
    ) : (
      <Navigate to={redirectTo} />
    )
  }
}
