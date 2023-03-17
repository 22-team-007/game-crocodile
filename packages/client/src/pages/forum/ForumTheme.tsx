import React from 'react'
import { Card, Container, Dropdown } from 'react-bootstrap'
import { ForumMessages } from './components'
import MessageForm from './components/MessageForm'
import svgMore from '../../assets/msgToolbar/more.svg'

const ForumTheme = () => {
  return (
    <Container className="forum-container">
      <Card>
        <Card.Header>
          <Card.Title className="d-flex align-items-center justify-content-sm-between">
            Название темы
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic"><img src={svgMore} alt="more"/></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Изменить</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <ForumMessages/>
          <MessageForm/>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ForumTheme
