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

  const hasError = (k:string)=>{
    const v = errors[k];
    return (typeof v === 'string' && v.length>0)
  }

  return <Form onSubmit={editSubmit}>
    <Form.Group key="pasword-group-0" controlId="oldPassword" className="mb-3">
      <Form.Label>Текущий пароль</Form.Label>
      <Form.Control type="password" placeholder="****************"
        isInvalid={hasError('oldPassword')}
        onChange={editField('oldPassword')}
      />
      <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group key="pasword-group-1" controlId="newPassword" className="mb-3">
      <Form.Label>Новый пароль</Form.Label>
      <Form.Control type="password" placeholder="****************"
        isInvalid={hasError('newPassword')}
        onChange={editField('newPassword')}
      />
      <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group key="pasword-group-2" controlId="repeatPassword" className="mb-3">
      <Form.Label>Подтверждение</Form.Label>
      <Form.Control type="password" placeholder="****************"
        isInvalid={hasError('repeatPassword')}
        onChange={editField('repeatPassword')}
      />
      <Form.Control.Feedback type="invalid">{errors.repeatPassword}</Form.Control.Feedback>
    </Form.Group>
    <Button variant="success" type="submit" className="me-2">Сохранить</Button>
  </Form>
}

export default FormPassword