import { FC } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { MessageForm } from './index'
import { useForm } from 'react-hook-form'

interface NewThemeModalProps {
  show: boolean
  switchModal: () => void
}

const NewThemeModal: FC<NewThemeModalProps> = ({
     show,
     switchModal
   }) => {

  const {register, setValue} = useForm()

  const createTopicHandler = () => {
    switchModal()
  }

  return (
    <Modal size='xl' show={show} onHide={switchModal}>
      <Modal.Header closeButton>
        <Modal.Title>Введите название темы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-4' controlId='topicName'>
            <Form.Control
              placeholder='Название темы'
              {...register('subject')}
            />
          </Form.Group>
          <MessageForm />
          <div className='d-flex justify-content-center'>
            <Button variant='primary' onClick={createTopicHandler}>
              Создать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewThemeModal
