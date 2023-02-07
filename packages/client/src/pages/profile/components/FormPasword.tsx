import { useState, ChangeEvent, FormEvent, FC } from 'react'
import { Button, Form } from 'react-bootstrap'

type FormPasswordProps = {
  close: () => void,
}

const FormPassword: FC<FormPasswordProps> = ({close}) => {
  const [fieldsEdit, setFieldsEdit] = useState<PasswordParams>({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  })
  const [errors, setErrors] = useState<Record<string,string|undefined>>({})
  const setError = (k:string, e:string|undefined) => {
    setErrors({ ...errors, [k]: e })
  }
  const editField = (k:string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFieldsEdit({ ...fieldsEdit, [k]: e.target.value })
    }
  }
  const editSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    //save api
    fetch(`/`).then(() => {
      if(fieldsEdit.newPassword!==fieldsEdit.repeatPassword){
        setError('repeatPassword','Пароли не совпадают');
        return;
      }
      close()
    })
  }
  return <Form onSubmit={editSubmit}>
    <Form.Group key="pasword-group-0" controlId="oldPassword" className="mb-3">
      <Form.Label>Текущий пароль</Form.Label>
      <Form.Control isInvalid={ !!errors.oldPassword && errors.oldPassword.length>0 } onChange={editField('oldPassword')} type="password" placeholder="****************"/>
      <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group key="pasword-group-1" controlId="newPassword" className="mb-3">
      <Form.Label>Новый пароль</Form.Label>
      <Form.Control isInvalid={ !!errors.newPassword && errors.newPassword.length>0 } onChange={editField('newPassword')} type="password" placeholder="****************"/>
      <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group key="pasword-group-2" controlId="repeatPassword" className="mb-3">
      <Form.Label>Подтверждение</Form.Label>
      <Form.Control isInvalid={ !!errors.repeatPassword && errors.repeatPassword.length>0 } onChange={editField('repeatPassword')} type="password" placeholder="****************"/>
      <Form.Control.Feedback type="invalid">{errors.repeatPassword}</Form.Control.Feedback>
    </Form.Group>
    <Button variant="success" type="submit" className="me-2">Сохранить</Button>
  </Form>
}

export default FormPassword