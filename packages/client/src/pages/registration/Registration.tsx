// React-Hook-Form
import { useForm } from 'react-hook-form'
// interfaces
import { RegistrationData } from '../../types/interfaces'
// components
import FormInput from '../../components/FormInput'
// Bootstrap components
import { Button, Container, Form } from 'react-bootstrap'
// Utils
import { validation } from '../../utils/validation'

const Registration = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>()

  const onSubmitHandler = (data: RegistrationData) => {
    console.log(data)
    fetch('https://ya-praktikum.tech/api/v2/auth/signup', {
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
    <>
      <Container className='vh-100 d-flex justify-content-center align-items-center'>
        <Form style={{ width: '300px' }} noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <h3 className='text-center'>Регистрация</h3>

          <FormInput
            label={'Почта'}
            isInvalid={!!errors?.email}
            register={
              register('email', {
                required: 'Обязательное поле.',
                pattern: validation.email.regExp!
              })
            }
            errorMsg={errors?.email?.message}
          />

          <FormInput
            label={'Логин'}
            isInvalid={!!errors?.login}
            register={
              register('login', {
                required: 'Обязательное поле.',
                pattern: validation.login.regExp!
              })
            }
            errorMsg={errors?.login?.message}
          />

          <FormInput
            label={'Имя'}
            isInvalid={!!errors?.first_name}
            register={
              register('first_name', {
                required: 'Обязательное поле.',
                pattern: validation.first_name.regExp!
              })
            }
            errorMsg={errors?.first_name?.message}
          />

          <FormInput
            label={'Фамилия'}
            isInvalid={!!errors?.second_name}
            register={
              register('second_name', {
                required: 'Обязательное поле.',
                pattern: validation.second_name.regExp!
              })
            }
            errorMsg={errors?.second_name?.message}
          />

          <FormInput
            label={'Телефон'}
            isInvalid={!!errors?.phone}
            register={
              register('phone', {
                required: 'Обязательное поле.',
                pattern: validation.phone.regExp!
              })
            }
            errorMsg={errors?.phone?.message}
          />

          <FormInput
            label={'Пароль'}
            isInvalid={!!errors?.password}
            isPassword
            register={
              register('password', {
                required: 'Обязательное поле.',
                pattern: validation.password.regExp!
              })
            }
            errorMsg={errors?.password?.message}
          />

          <FormInput
            label={'Пароль (еще раз)'}
            isInvalid={!!errors?.password_repeat}
            isPassword
            register={
              register('password_repeat', {
                required: 'Обязательное поле.'
              })
            }
            errorMsg={errors?.password_repeat?.message}
          />

          <Button className='w-100 mt-3' type='submit'>Зарегистрироваться</Button>
          <Button className='w-100' size={'sm'} variant='link'>Войти</Button>
        </Form>
      </Container>
    </>
  )
}

export default Registration
