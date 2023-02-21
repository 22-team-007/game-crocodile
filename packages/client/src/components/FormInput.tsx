// React
import { FC, memo, useId } from 'react'
// React-Hook-Form
import { UseFormRegisterReturn } from 'react-hook-form'
// Bootstrap components
import { Form } from 'react-bootstrap'

interface FormInputProps {
  label: string
  isInvalid: boolean
  isPassword?: boolean
  placeholder?: string
  register: UseFormRegisterReturn
  errorMsg?: string
}

/**
 * @example
 * <FormInput
 *   label={'Почта'}
 *   isInvalid={!!errors?.email}
 *   register={
 *     register('email', {
 *       required: 'Обязательное поле.'
 *     })
 *   }
 *   errorMsg={errors?.email?.message}
 * />
 */
const FormInput: FC<FormInputProps> = ({
  register,
  errorMsg,
  isInvalid,
  placeholder,
  label,
  isPassword,
}) => {
  const controlId = useId()

  return (
    <Form.Group controlId={controlId}>
      <Form.Label className="mb-0 mx-1">{label}</Form.Label>
      <Form.Control
        {...register}
        isInvalid={isInvalid}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder || label}
      />
      <Form.Control.Feedback className="mt-0" type="invalid">
        {errorMsg}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default memo(FormInput)
