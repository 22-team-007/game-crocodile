// React
import { FC } from 'react'
// Components
import { Button, Form, Modal } from 'react-bootstrap'
import { MessageForm } from './index'
// Hooks
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectUser } from '../../../store/selectors'
// Api
import api from '../../../api'
import { useNavigate } from 'react-router-dom'

interface NewThemeModalProps {
  show: boolean
  switchModal: () => void
}

const NewThemeModal: FC<NewThemeModalProps> = ({
     show,
     switchModal
   }) => {

  const navigate = useNavigate()

  const {register, control, handleSubmit} = useForm<FormFieldsTheme>({
    defaultValues: {
      subject: '',
      description: ''
    }
  })
  const user = useAppSelector(selectUser)

  const createTopicHandler = (data: FormFieldsTheme) => {
    if (user) {
      api.forum.create({
        author_id: user.id,
        parent_id: null,
        description: data.description,
        subject: data.subject
      }).then((result) => {
        switchModal()
        navigate(`${result.id as number}`)
      })
    }
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
              {...register('subject', {required: 'Обязательное поле'})}
            />
          </Form.Group>
          <MessageForm
            mode={'create'}
            customRegister={{
              name: 'description',
              control,
              rules: {
                required: true
              }
            }}
          />
          <div className='d-flex justify-content-center'>
            <Button variant='primary' onClick={handleSubmit(createTopicHandler)}>
              Создать
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default NewThemeModal
