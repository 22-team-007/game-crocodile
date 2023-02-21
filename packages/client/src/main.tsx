import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'

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
  Forum,
  Registration,
  Page,
} from './pages'

import api from './api'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'


export enum Routes {
  Index = '/',
  Login = 'signin',
  Register = 'signup',
  Logout = 'signout',
  Game = 'game',
  Profile = 'profile',
  ProfileId = 'profile/:profileId',
  Leaderboard = 'leaders',
  Forum = 'forum',
  E404 = '404',
  E500 = '500',
}

const userLoader = async () => {
  let { id } = await api.auth.user()

  if (typeof id === 'undefined') {
    id = 0
  }

  localStorage.setItem('userId', String(id))
  return null
}

const router = createBrowserRouter([
  {
    path: Routes.Index,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: userLoader,
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
        loader: () => {
          console.log('We sending our logout request to server')
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
])

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
