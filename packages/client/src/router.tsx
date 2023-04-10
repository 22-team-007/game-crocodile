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
} from './pages'

import api from './api'
import { logoutUser } from './store/actions/user'
import { useAppDispatch } from './hooks/useAppSelector'
import { UserLogoutAction, UserDataAction } from './store/actions/types'
import { oAuthLoaderClient } from './components/OAuth/oAuth'

export enum Routes {
  Index = '/',
  Login = 'signin',
  Register = 'signup',
  Logout = 'signout',
  GameList = 'game',
  Game = 'game/:chatId',
  Profile = 'profile',
  ProfileId = 'profile/:profileId',
  Leaderboard = 'leaders',
  Forum = 'forum',
  E404 = '404',
  E500 = '500',
  OAuth = 'oauth',
}

export function getRouterConf(forTest = '') {
  let dispatch: (arg0: UserLogoutAction | UserDataAction) => any

  if (!forTest) {
    dispatch = useAppDispatch()
  }

  const routerConf: RouteObject[] = [
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
          path: Routes.GameList,
          element: (
            <Page title="Крокодил - Игра">
              <GameList />
            </Page>
          ),
        },
        {
          path: Routes.Game,
          element: (
            <Page title="Крокодил - Игра">
              <Game />
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
        {
          path: Routes.Profile,
          element: (
            <Page title="Крокодил - Профиль">
              <PrivateProfile />
            </Page>
          ),
        },
        {
          path: Routes.ProfileId,
          loader: undefined,
          element: (
            <Page title="Крокодил - Профиль">
              <Profile />
            </Page>
          ),
        },
        {
          path: Routes.Leaderboard,
          loader: leaderBoardLoader,
          element: (
            <Page title="Крокодил - Лидеры">
              <LeaderBoard />
            </Page>
          ),
        },
        {
          path: Routes.Forum,
          element: (
            <Page title="Крокодил - Форум">
              <Forum />
            </Page>
          ),
        },
        {
          path: Routes.Logout,
          loader: async () => {
            await api.auth.logOut()
            forTest ? false : dispatch(logoutUser())
            return redirect('/')
          },
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
    {
      path: Routes.OAuth,
      loader: oAuthLoaderClient,
    },
  ]

  return routerConf
}

export function Index() {
  const router = getRouterConf()

  return <RouterProvider router={createBrowserRouter(router)} />
}
