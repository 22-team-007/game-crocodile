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

import { useAppDispatch } from '../../hooks/useAppSelector'
import { usertActions } from '../../store/actions'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()
  
  const dispatch = useAppDispatch()

  const onSubmitHandler = (data: LoginData) => {
    api.auth.signIn(data).then(user => {
      dispatch(usertActions.setUSer(user))
    })
  }

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Form
        style={{ width: '300px' }}
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}>
        <h3 className="text-center">Вход</h3>

        <FormInput
          label={'Логин'}
          isInvalid={!!errors?.login}
          register={register('login', {
            required: 'Обязательное поле.',
            pattern: validation.login.regExp!,
          })}
          errorMsg={errors?.login?.message}
        />

        <FormInput
          label={'Пароль'}
          isInvalid={!!errors?.password}
          isPassword
          register={register('password', {
            required: 'Обязательное поле.',
            pattern: validation.password.regExp!,
          })}
          errorMsg={errors?.password?.message}
        />

        <Button className="w-100 mt-3" type="submit">
          Войти
        </Button>
        <NavLink to={`/${Routes.Register}`}>
          <Button className="w-100" size="sm" variant="link">
            Нет аккаунта?
          </Button>
        </NavLink>
      </Form>
    </Container>
  )
}

export default WithAuth(Login, '/game', true)
