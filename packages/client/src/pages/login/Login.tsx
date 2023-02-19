// React-Hook-Form
import { useForm } from 'react-hook-form'
// Router
import { NavLink } from 'react-router-dom'
import { Routes } from '../../main'
import WithAuth from '../../hoc/withAuth'
// interfaces
import { LoginData } from '../../types/interfaces'
// components
import FormInput from '../../components/FormInput'
// Bootstrap components
import { Button, Card, Container, Form } from 'react-bootstrap'
// Utils
import { validation } from '../../utils'
import api from '../../api'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()

  const onSubmitHandler = (data: LoginData) => {
    api.auth.signIn(data)
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Form style={{width: '500px'}} noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <Card>
          <Card.Header>
            <Card.Title>
              <h3 className="text-center">Вход</h3>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <FormInput
              label={'Логин'}
              isInvalid={!!errors?.login}
              register={
                register('login', {
                  required: 'Обязательное поле.',
                  pattern: validation.login.regExp!,
                })
              }
              errorMsg={errors?.login?.message}
            />

            <FormInput
              label={'Пароль'}
              isInvalid={!!errors?.password}
              isPassword
              register={
                register('password', {
                  required: 'Обязательное поле.',
                  pattern: validation.password.regExp!,
                })
              }
              errorMsg={errors?.password?.message}
            />

          </Card.Body>
          <Card.Footer>
            <Button className='w-100 mt-3' type='submit'>Войти</Button>
            <NavLink to={`/${Routes.Register}`}>
              <Button className='w-100' size='sm' variant='link'>Нет аккаунта?</Button>
            </NavLink>
          </Card.Footer>
        </Card>
      </Form>
    </Container>
  )
}

export default WithAuth(Login, '/game', true)
