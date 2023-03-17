import { FC } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

interface NewThemeModalProps {
  show: boolean
  switchModal: () => void
}

const NewThemeModal: FC<NewThemeModalProps> = ({
  show,
  switchModal
  }) => {

  const createTopicHandler = () => {
    switchModal()
  }

  return (
    <Modal show={show} onHide={switchModal}>
      <Modal.Header closeButton>
        <Modal.Title>Введите название темы</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Form>
          <Form.Group className="mb-4" controlId="topicName">
            <Form.Control
              placeholder="Название темы"
            />
          </Form.Group>

          <Button variant="primary" onClick={createTopicHandler}>
            Создать
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewThemeModal
