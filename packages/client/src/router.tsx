import { redirect, RouterProvider, createBrowserRouter } from 'react-router-dom'
import type { RouteObject, LoaderFunctionArgs } from 'react-router-dom'
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
import { userTypes } from './store/actions/user'

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
  ForumTheme = 'forum/:id',
  E404 = '404',
  E500 = '500',
  OAuth = 'oauth',
}

export function getRouterConf(forTest = '') {
  let dispatch: (arg0: UserLogoutAction | UserDataAction) => any
  let OAuthLoader: ((arg: LoaderFunctionArgs) => any) | undefined

  if (!forTest) {
    dispatch = useAppDispatch()

    OAuthLoader = async ({ request }) => {
      const code = new URL(request.url).searchParams.get('code')

      if (code) {
        const redirectURI = '/oauth'

        let resp = await api.oauth.signIn(code, redirectURI)

        // try log out and enter again
        if (resp.reason === 'User already in system') {
          await api.auth.logOut()
          resp = await api.oauth.signIn(code, redirectURI)
        }

        if (resp.reason === 'ok') {
          const user = await api.auth.user()

          if (user?.id) {
            dispatch({ type: userTypes.SET_USER_DATA, payload: user })
          }
        }
      }
      return redirect('/')
    }
  } else {
    OAuthLoader = undefined
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
          path: Routes.ForumTheme,
          element: (
            <Page title="Крокодил - Форум">
              <ForumTheme />
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
      loader: OAuthLoader,
    },
  ]

  return routerConf
}

export function Index() {
  const router = getRouterConf()

  return <RouterProvider router={createBrowserRouter(router)} />
}
