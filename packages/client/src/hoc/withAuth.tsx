import React from 'react'

export default function WithAuth<P extends object, T extends object>(
  PrivatComponent: React.ComponentType<P>,
  RedirectComponent: React.ComponentType<T>
): React.ComponentType {
  // @ts-ignore  @typescript-eslint/no-explicit-any
  return function (props: any) {
    let login: string | null = localStorage.getItem('login')

    // пока рандомно определим зарагестрировался ли пользователь
    login = Math.random() > 0.5 ? 'nameOfuser' : null

    return login ? (
      <PrivatComponent {...props} />
    ) : (
      <RedirectComponent {...props} />
    )
  }
}
