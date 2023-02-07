import { useState, ChangeEvent, FormEvent, FC } from 'react'
import { Button, Form } from 'react-bootstrap'

type FormEditProps = {
  fields: ProfileParams,
  close: (fields: ProfileParams) => void
}

const FormEdit: FC<FormEditProps>  = ({fields, close}) => {
  const [fieldsEdit, setFieldsEdit] = useState<ProfileParams>(fields)
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
      if(!fieldsEdit.first_name || fieldsEdit.first_name.length===0){
        setError('first_name','Заполните Имя');
        return;
      }
      close(fieldsEdit)
    })
  }
  return <Form onSubmit={editSubmit}>
    <Form.Group>
      <Form.Label>Имя</Form.Label>
      <Form.Control isInvalid={ !!errors.first_name && errors.first_name.length>0 } onChange={editField('first_name')} type="text" placeholder="Имя" value={fieldsEdit.first_name} />
      <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>Фамилия</Form.Label>
      <Form.Control isInvalid={ !!errors.second_name && errors.second_name.length>0 } onChange={editField('second_name')} type="text" placeholder="Фамилия" value={fieldsEdit.second_name} />
      <Form.Control.Feedback type="invalid">{errors.second_name}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>Псевдоним</Form.Label>
      <Form.Control isInvalid={ !!errors.display_name && errors.display_name.length>0 } onChange={editField('display_name')} type="text" placeholder="Псевдоним" value={fieldsEdit.display_name} />
      <Form.Control.Feedback type="invalid">{errors.display_name}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>Логин</Form.Label>
      <Form.Control isInvalid={ !!errors.login && errors.login.length>0 } onChange={editField('login')} type="text" placeholder="Логин" value={fieldsEdit.login} />
      <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control isInvalid={ !!errors.email && errors.email.length>0 } onChange={editField('email')} type="text" placeholder="Email" value={fieldsEdit.email} />
      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>Телефон</Form.Label>
      <Form.Control isInvalid={ !!errors.phone && errors.phone.length>0 } onChange={editField('phone')} type="text" placeholder="Телефон" value={fieldsEdit.phone} />
      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
    </Form.Group>
    <Button variant="success" type="submit" className="ms-2 me-2">Сохранить</Button>
  </Form>
}

export default FormEdit;