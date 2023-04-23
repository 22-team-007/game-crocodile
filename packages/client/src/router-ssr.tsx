import type { RouteObject } from 'react-router-dom'

import App from './layouts/app/App'
import {
  StartPage,
  ErrorPage,
  Login,
  Registration,
  Page,
} from './pages/index-ssr'

import { routes } from './constants/routes'
import api from './api'

export const routerConf: RouteObject[] = [
  {
    path: routes.Index,
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
        path: routes.Login,
        element: (
          <Page title="Крокодил - Вход">
            <Login />
          </Page>
        ),
      },
      {
        path: routes.Register,
        element: (
          <Page title="Крокодил - Регистрация">
            <Registration />
          </Page>
        ),
      },
    ],
  },
  {
    path: routes.E404,
    element: (
      <Page title="Ошибка - 404">
        <ErrorPage />
      </Page>
    ),
  },
  {
    path: routes.E500,
    element: (
      <Page title="Ошибка - 500">
        <ErrorPage />
      </Page>
    ),
  },
]
