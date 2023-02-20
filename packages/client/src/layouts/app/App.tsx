import { useMemo } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import { LINKS } from './constants'

import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'

const App = () => {
  let userId = localStorage.getItem('userId')

  if (userId === '0') {
    userId = null
  }

  const availableLinks = useMemo(() => LINKS.filter(link => !((link.showUnregOnly && userId !== null) ||
  (link.private && userId === null))),
  [userId])

  return (
    <div className="App">
      <Navbar fixed='top' className="mb-4" bg="light">
        <Container>
          <NavLink className="navbar-brand" to="/">
            Крокодил
          </NavLink>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1">
              {availableLinks.map(link => (
                  <NavLink className="nav-link" key={link.path} to={link.path}>
                    {link.title}
                  </NavLink>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{paddingTop: '70px'}}>
        <Outlet />
      </Container>
    </div>
  )
}

export default App
