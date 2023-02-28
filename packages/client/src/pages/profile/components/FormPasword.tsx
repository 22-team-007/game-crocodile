import { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import api from '../../../api'
import { validation } from '../../../utils'
import FormInput from '../../../components/FormInput'

type FormPasswordProps = {
  close: () => void
}

const FormPassword: FC<FormPasswordProps> = ({ close }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordParams>()

  const onSubmitEditHandler = (data: PasswordParams) => {
    api.users.password(data).then(() => close())
  }

  const onValidateRepeatPassword = (value: string | undefined) => {
    if (watch('newPassword') === value){
      return true
    }
    return 'пароли не совпадают'
  }

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmitEditHandler)}>
      <FormInput
        label={'Текущий пароль'}
        isInvalid={!!errors.oldPassword}
        isPassword
        placeholder={'****************'}
        register={register('oldPassword', {
          required: 'Обязательное поле.',
          pattern: { value: validation.password.regExp, message: validation.password.message },
        })}
        errorMsg={errors?.oldPassword?.message}
      />

      <FormInput
        label={'Новый пароль'}
        isInvalid={!!errors.newPassword}
        isPassword
        placeholder={'****************'}
        register={register('newPassword', {
          required: 'Обязательное поле.',
          pattern: { value: validation.password.regExp, message: validation.password.message },
        })}
        errorMsg={errors?.newPassword?.message}
      />

      <FormInput
        label={'Подтверждение'}
        isInvalid={!!errors.repeatPassword}
        isPassword
        placeholder={'****************'}
        register={register('repeatPassword', {
          required: 'Обязательное поле.',
          validate: value => onValidateRepeatPassword(value)
        })}
        errorMsg={errors?.repeatPassword?.message}
      />

      <Button variant="success" type="submit" className="me-2">
        Сохранить
      </Button>
    </Form>
  )
}

export default FormPassword
