import { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/FormInput'
import { validation } from '../../../utils'
import api from '../../../api'

type FormEditProps = {
  fields: ProfileParams,
  close: (fields: ProfileParams) => void
}

const FormEdit: FC<FormEditProps>  = ({fields, close}) => {

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileParams>({defaultValues: fields})

  const onSubmitEditHandler = (data: ProfileParams) => {
    api.users.profile(data as UserType).then(() => close())
  }

  return <Form noValidate onSubmit={handleSubmit(onSubmitEditHandler)}>

    <FormInput
      label={'Имя'}
      isInvalid={!!errors.first_name}
      register={
        register('first_name', {
          required: 'Обязательное поле.',
          pattern: validation.first_name.regExp,
        })
      }
      errorMsg={errors?.first_name?.message}
    />

    <FormInput
      label={'Фамилия'}
      isInvalid={!!errors.second_name}
      register={
        register('second_name', {
          required: 'Обязательное поле.',
          pattern: validation.second_name.regExp,
        })
      }
      errorMsg={errors?.second_name?.message}
    />

    <FormInput
      label={'Псевдоним'}
      isInvalid={!!errors.display_name}
      register={
        register('display_name', {
          required: 'Обязательное поле.',
          pattern: validation.display_name.regExp,
        })
      }
      errorMsg={errors?.display_name?.message}
    />

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
      label={'Email'}
      isInvalid={!!errors?.email}
      register={
        register('email', {
          required: 'Обязательное поле.',
          pattern: validation.email.regExp!,
        })
      }
      errorMsg={errors?.email?.message}
    />

    <FormInput
      label={'Телефон'}
      isInvalid={!!errors?.phone}
      register={
        register('phone', {
          required: 'Обязательное поле.',
          pattern: validation.phone.regExp!,
        })
      }
      errorMsg={errors?.phone?.message}
    />

    <Button variant="success" type="submit" className="ms-2 me-2">Сохранить</Button>
  </Form>
}

export default FormEdit;
