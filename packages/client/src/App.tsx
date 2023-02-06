import { Outlet } from 'react-router-dom'
// components
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
// styles
import './App.css'

export async function appLoader() {
  // проверить зарегестрирован ли пользователь
  // await fakeNetwork()

  return null
}
export function appAction() {
  return null
}

function App() {
  type getClassCbk =
    | ((props: { isActive: boolean; isPending: boolean }) => string | undefined)
    | undefined

  const isActive: getClassCbk = ({ isActive, isPending }) => {
    const active = isActive ? 'active' : isPending ? 'pending' : ''
    return `nav-link ${active}`
  }

  return (
    <div className="App">
      <Navbar bg="light" className="nav nav-tabs">
        <Container>
          <Navbar.Brand>
            <Link to="/">Crocodile</Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto"> */}
            <ul className="nav nav-tabs">
              <li className="list-group-item">
                <NavLink className={isActive} to="/">
                  Home
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="login">
                  login
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="registration">
                  registration
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="game">
                  game
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="profile">
                  profile
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="leaderboard">
                  leaderboard
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="forum">
                  forum
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="404">
                  404
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink className={isActive} to="500">
                  500
                </NavLink>
              </li>
            </ul>
            {/* </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {<Outlet />}
    </div>
  )
}

export default App
