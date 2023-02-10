import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
// components
import App from './layouts/app/App'
import {
  StartPage,
  ErrorPage,
  ProfilePage,
  Login,
  LeaderBoard,
  leaderBoardLoader,
  Game,
  Forum,
  Registration,
} from './pages'
// styles
import 'bootstrap/dist/css/bootstrap.min.css'

export enum Routes {
  Index = '/',
  Login = 'signin',
  Register = 'signup',
  Logout = 'signout',
  Game = 'game',
  Profile = 'profile',
  Leaderboard = 'liders',
  Forum = 'forum',
  E404 = '404',
  E500 = '500',
}

// приватные страницы
// const LoginPage = WithAuth(Login, `/${Routes.Game}`)
// const ProfilePage = WithAuth(Profile, `/${Routes.Login}`)
// const GamePage = WithAuth(Game, `/${Routes.Login}`)

const router = createBrowserRouter([
  {
    path: Routes.Index,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: undefined,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: Routes.Login,
        element: <Login />,
      },
      {
        path: Routes.Game,
        element: <Game />,
      },
      {
        path: Routes.Register,
        element: <Registration />,
      },
      {
        path: Routes.Profile,
        element: <ProfilePage />,
      },
      {
        path: Routes.Leaderboard,
        loader: leaderBoardLoader,
        element: <LeaderBoard />,
      },
      {
        path: Routes.Forum,
        element: <Forum />,
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
    element: <ErrorPage />,
  },
  {
    path: Routes.E500,
    element: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
