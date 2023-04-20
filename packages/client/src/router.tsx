import { redirect, RouterProvider, createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
// components
import App from './layouts/app/App'

import {
  StartPage,
  ErrorPage,
  Profile,
  PrivateProfile,
  Login,
  LeaderBoard,
  leaderBoardLoader,
  Game,
  GameList,
  Forum,
  Registration,
  Page,
  ForumTheme,
} from './pages'

import api from './api'
import { logoutUser } from './store/actions/user'
import { useAppDispatch } from './hooks/useAppSelector'
import { UserLogoutAction, UserDataAction } from './store/actions/types'
import { routes } from './constants/routes'

export function getRouterConf(forTest = '') {
  let dispatch: (arg0: UserLogoutAction | UserDataAction) => any

  if (!forTest) {
    dispatch = useAppDispatch()
  }

  const routerConf: RouteObject[] = [
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
          path: routes.GameList,
          element: (
            <Page title="Крокодил - Игра">
              <GameList />
            </Page>
          ),
        },
        {
          path: routes.Game,
          element: (
            <Page title="Крокодил - Игра">
              <Game />
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
        {
          path: routes.Profile,
          element: (
            <Page title="Крокодил - Профиль">
              <PrivateProfile />
            </Page>
          ),
        },
        {
          path: routes.ProfileId,
          loader: undefined,
          element: (
            <Page title="Крокодил - Профиль">
              <Profile />
            </Page>
          ),
        },
        {
          path: routes.Leaderboard,
          loader: leaderBoardLoader,
          element: (
            <Page title="Крокодил - Лидеры">
              <LeaderBoard />
            </Page>
          ),
        },
        {
          path: routes.Forum,
          element: (
            <Page title="Крокодил - Форум">
              <Forum />
            </Page>
          ),
        },
        {
          path: routes.ForumTheme,
          element: (
            <Page title="Крокодил - Форум">
              <ForumTheme />
            </Page>
          ),
        },
        {
          path: routes.Logout,
          loader: async () => {
            await api.auth.logOut()
            forTest ? false : dispatch(logoutUser())
            return redirect('/')
          },
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

  return routerConf
}

export function Index() {
  const router = getRouterConf()

  return <RouterProvider router={createBrowserRouter(router)} />
}
