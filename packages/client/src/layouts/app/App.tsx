import { Outlet } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { LINKS } from './constants'

export async function appLoader() {
  // проверить зарегестрирован ли пользователь
  // await fakeNetwork()

  return null
}

function App() {
  return (
    <div className="App">
      <Navbar bg="light" className="nav nav-tabs">
        <Container>
          <Navbar.Brand>
            <Link to="/">Crocodile</Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className="nav nav-tabs">
              {LINKS.map(link => (
                <li className="list-group-item" key={link.path}>
                  {' '}
                  <NavLink className="nav-link" to={link.path}>
                    {' '}
                    {link.title}{' '}
                  </NavLink>{' '}
                </li>
              ))}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default App
