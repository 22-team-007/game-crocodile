import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
// components
import App, { appLoader } from './layouts/app/App'
import StartPage from './pages/startPage/StartPage'
import ErrorPage from './pages/error/Error'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import LeaderBoard from './pages/leaderBoard/LeaderBoard'
import Game from './pages/game/Game'
import Profile from './pages/Profile/profile'
import Forum from './pages/forum/Forum'
// hoc for private pages
import WithAuth from './hoc/withAuth'
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
const LoginPage = WithAuth(Login, '/' + Routes.Game, true)
const ProfilePage = WithAuth(Profile, '/' + Routes.Login, false)
const GamePage = WithAuth(Game, '/' + Routes.Login, false)

const router = createBrowserRouter([
  {
    path: Routes.Index,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: Routes.Login,
        element: <LoginPage />,
      },
      {
        path: Routes.Game,
        element: <GamePage />,
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
