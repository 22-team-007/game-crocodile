// React-Hook-Form
import { useForm } from 'react-hook-form'
// Router
import { NavLink } from 'react-router-dom'
import { Routes } from '../../router'
import WithAuth from '../../hoc/withAuth'
// components
import FormInput from '../../components/FormInput'
// Bootstrap components
import { Button, Card, Container, Form } from 'react-bootstrap'
// Utils
import { validation } from '../../utils'

import { useAppDispatch } from '../../hooks/useAppSelector'
import { setUser } from '../../store/actions/user'
import api from '../../api'

const OAuthUrl = 'https://oauth.yandex.ru/authorize?response_type=code'
const redirectURI = window.location.origin

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  const dispatch = useAppDispatch()

  const onSubmitHandler = (data: LoginData) => {
    dispatch(setUser(data))
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form
        style={{ width: '500px' }}
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}>
        <Card>
          <Card.Header>
            <Card.Title>Вход</Card.Title>
          </Card.Header>
          <Card.Body>
            <FormInput
              label={'Логин'}
              isInvalid={!!errors?.login}
              register={register('login', {
                required: 'Обязательное поле.',
                pattern: validation.login,
              })}
              errorMsg={errors?.login?.message}
            />

            <FormInput
              label={'Пароль'}
              isInvalid={!!errors?.password}
              isPassword
              register={register('password', {
                required: 'Обязательное поле.',
                pattern: validation.password,
              })}
              errorMsg={errors?.password?.message}
            />
          </Card.Body>
          <Card.Footer>
            <Button className="w-100 mt-3" type="submit">
              Войти
            </Button>
            <NavLink to={`/${Routes.Register}`}>
              <Button className="w-100" size="sm" variant="link">
                Нет аккаунта?
              </Button>
            </NavLink>
            <Button
              className="w-100"
              size="sm"
              variant="link"
              onClick={async () => {
                const OAuthClientId = await api.oauth.setvice(redirectURI)
                const goTo = `${OAuthUrl}&client_id=${OAuthClientId}&redirect_uri=${redirectURI}`

                window.location.replace(goTo)
              }}>
              Яндекс Id
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </Container>
  )
}

export default WithAuth(Login, '/game', true)
