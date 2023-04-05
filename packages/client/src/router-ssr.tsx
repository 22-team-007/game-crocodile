import type { RouteObject } from 'react-router-dom'
// components
import App from './layouts/app/App'

import { StartPage, ErrorPage, Login, Registration, Page } from './pages'

enum Routes {
  Index = '/',
  Login = '/signin',
  Register = '/signup',
  E404 = '404',
  E500 = '500',
}

export const routerConf: RouteObject[] = [
  {
    path: Routes.Index,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Page title="Крокодил - Главная страница">
            <StartPage />
          </Page>
        ),
      },
      {
        path: Routes.Login,
        element: (
          <Page title="Крокодил - Вход">
            <Login />
          </Page>
        ),
      },
      {
        path: Routes.Register,
        element: (
          <Page title="Крокодил - Регистрация">
            <Registration />
          </Page>
        ),
      },
    ],
  },
  {
    path: Routes.E404,
    element: (
      <Page title="Ошибка - 404">
        <ErrorPage />
      </Page>
    ),
  },
  {
    path: Routes.E500,
    element: (
      <Page title="Ошибка - 500">
        <ErrorPage />
      </Page>
    ),
  },
]
