// React
import { useEffect, useState } from 'react'
// Components
import { ForumThemes, NewThemeModal } from './components'
import {
  Card,
  Container,
  Form,
  Button,
  InputGroup
} from 'react-bootstrap'
// SVG
import svgSearch from '../../assets/msgToolbar/search.svg'
import svgClose from '../../assets/msgToolbar/close.svg'
// style
import './style.scss'

const Forum = () => {
  const [show, setShow] = useState(false)
  const handleSwitchModal = () => setShow(!show)

  return (
    <>
      <Container className="forum-container">
        <Card>
          <Card.Header>
            <Card.Title className='d-flex justify-content-sm-between align-items-center'>
              Форум
              <Button
                variant="outline-primary"
                onClick={handleSwitchModal}
              >
                Создать новую тему
              </Button>
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <InputGroup>
              <Form.Control
                placeholder="Найти тему"
              />
              <Button variant="outline-secondary"><img src={svgClose} alt='close' /></Button>
              <Button variant="outline-secondary"><img src={svgSearch} alt='search' /></Button>
            </InputGroup>

            <ForumThemes/>
          </Card.Body>
        </Card>
      </Container>
      <NewThemeModal show={show} switchModal={handleSwitchModal}/>
    </>
  )
}
export default Forum
