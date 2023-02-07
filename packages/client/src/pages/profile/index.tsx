import { useMemo, useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap'

import { Avatar } from '../../components'

import "./profile.scss"

enum Pages {
  Show = 'ProfileShow',
  Password = 'ProfilePassword',
  Edit = 'ProfileEdit',
}

function Profile() {
  const [fields, setFields] = useState<Record<string, string>>({})
  const [page, setPage] = useState(Pages.Show)

  const editSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //save api
    fetch(`/`).then(() => {
      setPage(Pages.Show)
    })
  }

  const passwordSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //save api
    fetch(`/`).then(() => {
      setPage(Pages.Edit)
    })
  }

  const setValue = (k: string, v: string) => {
    setFields({ ...fields, [k]: v })
  }

  const editField = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    //check value
    setValue(e.target.id, e.target.value)
  }

  useEffect(() => {
    //load by API
    fetch(`/`).then(() => {
      setFields({
        avatar: 'https://thispersondoesnotexist.com/image',
        first_name: 'Гоша',
        second_name: 'Рубчинский',
        display_name: 'Гошан',
        login: 'Gosha',
        email: 'mail@mail.ru',
        phone: '+79876543210',
      })
    })
  }, [])

  const switchPage = useMemo(() => {
    const fieldsInput: Field[] = [
      { label: 'Имя', type: 'text', name: 'first_name', value: fields.first_name },
      { label: 'Фамилия', type: 'text', name: 'second_name', value: fields.second_name },
      { label: 'Псевдоним', type: 'text', name: 'display_name', value: fields.display_name },
      { label: 'Логин', type: 'text', name: 'login', value: fields.login },
      { label: 'Email', type: 'email', name: 'email', value: fields.email },
      { label: 'Телефон', type: 'tel', name: 'phone', value: fields.phone },
    ]
    switch (page) {
      case Pages.Edit:
        return {
          Page: (<Form>{
            fieldsInput.map((e: Field) => {
              return (<Form.Group key={"edit-group-"+e.name} controlId={e.name} className="mb-3">
                <Form.Label>{e.label}</Form.Label>
                <Form.Control onChange={editField} type={e.type} placeholder={e.label} value={e.value} />
              </Form.Group>)
            })
          }</Form>),
          Button: (<>
            <Button variant="primary" type="button" onClick={() => setPage(Pages.Password)}>Сменить пароль</Button>
            <Button variant="success" type="button" onClick={editSubmit} className="ms-2 me-2">Сохранить</Button>
            <Button variant="danger" type="button" onClick={() => setPage(Pages.Show)}>Отмена</Button>
          </>)
        }
      case Pages.Password:
        return {
          Page: (<Form>
            <Form.Group key="pasword-group-0" controlId="oldPassword" className="mb-3">
              <Form.Label>Текущий пароль</Form.Label>
              <Form.Control type="password" placeholder="****************"/>
            </Form.Group>
            <Form.Group key="pasword-group-1" controlId="newPassword" className="mb-3">
              <Form.Label>Новый пароль</Form.Label>
              <Form.Control type="password" placeholder="****************"/>
            </Form.Group>
            <Form.Group key="pasword-group-2" controlId="newPassword2" className="mb-3">
              <Form.Label>Подтверждение</Form.Label>
              <Form.Control type="password" placeholder="****************"/>
            </Form.Group>
          </Form>),
          Button: (<>
            <Button variant="success" type="button" onClick={passwordSubmit} className="me-2">Сохранить</Button>
            <Button variant="danger" type="button" onClick={() => setPage(Pages.Edit)}>Отмена</Button>
          </>)
        }
      default:
        return {
          Page: (fieldsInput.map((e: Field) => {
            return (<Row key={"show-row-"+e.name}>
              <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>{e.label}:</Col>
              <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{e.value}</Col>
            </Row>)
          })),
          Button: (<Button variant="primary" type="button" onClick={() => setPage(Pages.Edit)}>Изменить</Button>)
        }
    }
  }, [page, fields])

  return <Container style={{ maxWidth: '960px' }}>
    <Card>
      <Card.Header>
        <Card.Title>Профиль</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs="12" md="6" lg="4"><Avatar src={fields.avatar} setValue={setValue}/></Col>
          <Col xs="12" md="6" lg="8">{switchPage.Page}</Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-end">{switchPage.Button}</Card.Footer>
    </Card>
  </Container>
}

export default Profile
