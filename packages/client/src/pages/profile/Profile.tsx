import { useEffect, useState } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import { Avatar, FormEdit, FormShow, FormPassword } from './components'

//import { useAppSelector } from '../../hooks/useAppSelector'
import withAuth from '../../hoc/withAuth'
import api from '../../api'

import './style.scss'

enum Pages {
  Show = 'ProfileShow',
  Password = 'ProfilePassword',
  Edit = 'ProfileEdit',
}

export const Profile = () => {
  const [fields, setFields] = useState<ProfileParams>({})
  const [page, setPage] = useState(Pages.Show)

  //const user = useAppSelector(state => state.userData.user) нужно dispatch сделать при вызове setValue

  useEffect(() => {
    api.auth
      .user()
      .then(data =>
        setFields({ ...data, avatar: api.resources.url(data.avatar) })
      )
  }, [])

  const setValue = (k: string, v: string) => {
    setFields({ ...fields, [k]: v })
  }

  return (
    <Container style={{ maxWidth: '960px' }}>
      <Card>
        <Card.Header>
          <Card.Title>Профиль</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs="12" md="6" lg="4">
              <Avatar src={fields.avatar} setValue={setValue} />
            </Col>
            <Col xs="12" md="6" lg="8">
              {page === Pages.Show && <FormShow fields={fields} />}
              {page === Pages.Password && (
                <FormPassword
                  close={() => {
                    setPage(Pages.Show)
                  }}
                />
              )}
              {page === Pages.Edit && (
                <FormEdit
                  fields={fields}
                  close={(f: ProfileParams) => {
                    setFields(f)
                    setPage(Pages.Show)
                  }}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button
            className="me-1"
            type="button"
            onClick={() => setPage(Pages.Password)}>
            Сменить пароль
          </Button>
          {page === Pages.Show && (
            <Button
              variant="success"
              type="button"
              onClick={() => setPage(Pages.Edit)}>
              Изменить
            </Button>
          )}
          {page !== Pages.Show && (
            <Button
              variant="danger"
              type="button"
              onClick={() => setPage(Pages.Show)}>
              Отмена
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  )
}

export const PrivateProfile = withAuth(Profile)
export default Profile
