import { Outlet } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { LINKS } from './constants'

import "./app.scss"

function App() {
  return (
    <div className="App">
      <Navbar fixed="top" bg="light">
        <Container>
          <NavLink className="navbar-brand" to="/">Крокодил</NavLink>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1">
              {LINKS.map(link => (
                <NavLink className="nav-link" key={link.path} to={link.path}>{link.title}</NavLink>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet/>
      </Container>
    </div>
  )
}

export default App
