import { useMemo } from 'react'
import { Container, Navbar, Nav, Image } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import { LINKS } from './constants'
import FullScreen from '../../components/FullScreen/fullScreen'

import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUserId, selectTheme } from '../../store/selectors'
import logo from '../../assets/logo.svg'

const App = () => {
  const userId = useAppSelector(selectUserId)
  const appTheme = useAppSelector(selectTheme)

  const availableLinks = useMemo(
    () =>
      LINKS.filter(
        link =>
          !(
            (link.showUnregOnly && userId !== undefined) ||
            (link.private && userId === undefined)
          )
      ),
    [userId]
  )

  return (
    <div className={`App ${appTheme}`}>
      <Navbar fixed="top" className="mb-4" bg="light">
        <Container>
          <NavLink className="navbar-brand p-0" to="/">
            <Image width={90} src={logo}/>   
          </NavLink>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1">
              {availableLinks.map(link => (
                <NavLink className="nav-link" key={link.path} to={link.path}>
                  {link.title}
                </NavLink>
              ))}
              <FullScreen />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ paddingTop: '70px' }}>
        <Outlet />
      </Container>
    </div>
  )
}

export default App
