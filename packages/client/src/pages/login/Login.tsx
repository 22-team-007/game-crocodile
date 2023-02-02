// React-Hook-Form
import { useForm } from 'react-hook-form'
// interfaces
import { LoginData } from '../../types/interfaces'
// components
import FormInput from '../../components/FormInput'
// Bootstrap components
import { Button, Container, Form } from 'react-bootstrap'
// Utils
import { validation } from '../../utils/validation'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()

  // Временно реализовал запрос здесь т.к пока что нет у нас обертки для запросов
  const onSubmitHandler = (data: LoginData) => {
    console.log(data)
    fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
      'headers': {
        'content-type': 'application/json'
      },
      'body': JSON.stringify(data),
      'method': 'POST',
      'mode': 'cors',
      'credentials': 'include'
    })
  }

  return (
    <Container className='vh-100 d-flex justify-content-center align-items-center'>
      <Form style={{width: '300px'}} noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <h3 className='text-center'>Вход</h3>

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
          register={
            register('password', {
              required: 'Обязательное поле.',
              pattern: validation.password.regExp!,
            })
          }
          errorMsg={errors?.password?.message}
        />

        <Button className='w-100 mt-3' type='submit'>Войти</Button>
        <Button className='w-100' size={'sm'} variant='link'>Нет аккаунта?</Button>
      </Form>
    </Container>
  )
}

export default Login
