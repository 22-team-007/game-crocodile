// React-Hook-Form
import { useForm } from 'react-hook-form'
// Router
import { NavLink } from 'react-router-dom'
import { Routes } from '../../router'
// components
import FormInput from '../../components/FormInput'
// Bootstrap components
import { Button, Card, Container, Form } from 'react-bootstrap'
// Utils
import { onValidateRepeatPassword, validation } from '../../utils'
import api from '../../api'

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationData>()

  const onSubmitHandler = (data: RegistrationData) => {
    api.auth.signUp(data)
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form
        style={{ width: '500px' }}
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}>
        <Card>
          <Card.Header>
            <Card.Title>
              <h3 className="text-center">Регистрация</h3>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <FormInput
              label={'Почта'}
              isInvalid={!!errors?.email}
              register={register('email', {
                required: 'Обязательное поле.',
                pattern: validation.email,
              })}
              errorMsg={errors?.email?.message}
            />

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
              label={'Имя'}
              isInvalid={!!errors?.first_name}
              register={register('first_name', {
                required: 'Обязательное поле.',
                pattern: validation.first_name,
              })}
              errorMsg={errors?.first_name?.message}
            />

            <FormInput
              label={'Фамилия'}
              isInvalid={!!errors?.second_name}
              register={register('second_name', {
                required: 'Обязательное поле.',
                pattern: validation.second_name,
              })}
              errorMsg={errors?.second_name?.message}
            />

            <FormInput
              label={'Телефон'}
              isInvalid={!!errors?.phone}
              register={register('phone', {
                required: 'Обязательное поле.',
                pattern: validation.phone,
              })}
              errorMsg={errors?.phone?.message}
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

            <FormInput
              label={'Пароль (еще раз)'}
              isInvalid={!!errors?.password_repeat}
              isPassword
              register={register('password_repeat', {
                required: 'Обязательное поле.',
                validate: value => onValidateRepeatPassword(watch('password'), value)

              })}
              errorMsg={errors?.password_repeat?.message}
            />
          </Card.Body>
          <Card.Footer>
            <Button className="w-100 mt-3" type="submit">
              Зарегистрироваться
            </Button>
            <NavLink to={`/${Routes.Login}`}>
              <Button className="w-100" size="sm" variant="link">
                Войти
              </Button>
            </NavLink>
          </Card.Footer>
        </Card>
      </Form>
    </Container>
  )
}

export default Registration
