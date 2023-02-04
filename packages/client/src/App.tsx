import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { Container } from 'react-bootstrap/'
import { NavLink } from 'react-router-dom'

export function appLoader() {
  return null
}
export function appAction() {
  return null
}

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  type getClassCbk =
    | ((props: { isActive: boolean; isPending: boolean }) => string | undefined)
    | undefined

  const isActive: getClassCbk = ({ isActive, isPending }) => {
    const active = isActive ? 'active' : isPending ? 'pending' : ''
    return `nav-link ${active}`
  }

  return (
    <div className="App">
      <Container className="d-flex justify-content-center align-items-center">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className={isActive} to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={isActive} to="/login">
              login
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className={isActive} to="/registration">
              registration
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink className={isActive} to="/game">
              game
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink className={isActive} to="/profile">
              profile
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink className={isActive} to="/leaderboard">
              leaderboard
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink className={isActive} to="/forum">
              forum
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink className={isActive} to="/404">
              404
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink className={isActive} to="/500">
              500
            </NavLink>
          </li>
        </ul>
      </Container>
      {<Outlet />}
    </div>
  )
}

export default App
