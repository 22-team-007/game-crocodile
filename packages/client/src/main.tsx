import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App, { appLoader, appAction } from './App'
import ErrorPage from './pages/error/Error'
// import Login from './pages/login/Login'
// import Registration from './pages/registration/Registration'
import Game from './pages/game/Game'
import WithAuth from './hoc/withAuth'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

function Login() {
  return <h1>Login page</h1>
}

function Registration() {
  return <h1>Registation page</h1>
}

function LeaderBoard() {
  return <h1>Leader Board</h1>
}

function Profile() {
  return <h1>Profile</h1>
}

function Forum() {
  return <h1>Forum</h1>
}

// приватные страницы
const MainPage = WithAuth(Game, Login)
const ProfilePage = WithAuth(Profile, Login)

enum Routes {
  Index = '/',
  Login = '/login',
  Register = '/registration',
  Game = '/game',
  Profile = '/profile',
  Leaderboard = '/leaderboard',
  Forum = '/forum',
  E404 = '/404',
  E500 = '/500',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    action: appAction,
    children: [
      {
        path: Routes.Index,
        element: <MainPage />,
      },
      {
        path: Routes.Login,
        element: <MainPage />,
      },
      {
        path: Routes.Game,
        element: <MainPage />,
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
        path: Routes.E404,
        element: <ErrorPage />,
      },
      {
        path: Routes.E500,
        element: <ErrorPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
