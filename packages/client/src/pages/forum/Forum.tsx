import { useState } from 'react'
import { ForumThemes, ForumMessages } from './components'
import {
  Card,
  Container,
  Tabs,
  Tab,
  Form,
  Button,
  Modal,
} from 'react-bootstrap'

import { mockTopics, mockMessages } from './mockData'
import './style.scss'

const Forum = () => {
  const [show, setShow] = useState(false)
  const [topicTitle, setTopicTitle] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const createTopicHandler = () => {
    handleClose()
  }

  const changeTopicHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicTitle(event.target.value)
  }

  return (
    <Container className="forum-container">
      <Card>
        <Card.Header>
          <Card.Title>Форум</Card.Title>
        </Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="themes" className="mb-3">
            <Tab eventKey="themes" title="Список тем">
              <Button variant="primary" onClick={handleShow}>
                Создать новую тему
              </Button>
              <ForumThemes chats={mockTopics} />
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Введите название темы</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  <Form>
                    <Form.Group className="mb-4" controlId="topicName">
                      <Form.Control
                        onChange={changeTopicHandler}
                        value={topicTitle}
                        type="text"
                        placeholder="Название темы"
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={createTopicHandler}>
                      Создать
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Tab>

            <Tab eventKey="messages" title="Список сообщений в теме">
              <ForumMessages
                messages={mockMessages}
                selectedChat={1}
                userId={1}
              />
              <Form>
                <Form.Group className="mb-3" controlId="comment">
                  <Form.Label>Оставьте свой комментарий</Form.Label>
                  <Form.Control as="textarea" placeholder="Ваше сообщение" />
                </Form.Group>
                <Button variant="primary">Отправить</Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  )
}
export default Forum
