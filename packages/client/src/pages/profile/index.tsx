import { useMemo, useEffect, useState, ChangeEvent, ChangeEventHandler, MouseEvent, FormEvent } from 'react'
import { Button, Form, Card, Row, Col, Container } from 'react-bootstrap'

import { Avatar, FormEdit, FormShow, FormPassword } from './components'

import "./profile.scss"

enum Pages {
  Show = 'ProfileShow',
  Password = 'ProfilePassword',
  Edit = 'ProfileEdit',
}

const Profile = () => {
  const [fields, setFields] = useState<ProfileParams>({})
  const [page, setPage] = useState(Pages.Show)

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

  const setValue = (k: string, v: string) => {
    setFields({ ...fields, [k]: v })
  }

  let profileForm = <FormShow fields={fields}/>;
  let changeButton = <Button variant="danger" type="button" onClick={() => setPage(Pages.Show)}>Отмена</Button>;
  
  if(page === Pages.Edit)
    profileForm = <FormEdit { ...{
      fields,
      close: (f:ProfileParams)=>{
        setFields(f);
        setPage(Pages.Show)
      }
    } }/>;
  else if(page === Pages.Password)
    profileForm = <FormPassword close={()=>{ setPage(Pages.Show)} } />;
  else
    changeButton = <Button variant="success" type="button" onClick={() => setPage(Pages.Edit)}>Изменить</Button>
  
  return <Container style={{ maxWidth: '960px' }}>
    <Card>
      <Card.Header>
        <Card.Title>Профиль</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs="12" md="6" lg="4"><Avatar src={fields.avatar} setValue={setValue}/></Col>
          <Col xs="12" md="6" lg="8">{profileForm}</Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button className="me-1" type="button" onClick={() => setPage(Pages.Password)}>Сменить пароль</Button>
        {changeButton}
      </Card.Footer>
    </Card>
  </Container>
}

export default Profile
