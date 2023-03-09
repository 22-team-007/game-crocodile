import { useEffect, useState } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import { Avatar, FormEdit, FormShow, FormPassword } from './components'

import withAuth from '../../hoc/withAuth'
import api from '../../api'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector'
import { selectUser, selectUserAvatar } from '../../store/selectors'
import { setAvatar, setProfile } from '../../store/actions/user'

import './style.scss'

enum Pages {
  Show = 'ProfileShow',
  Password = 'ProfilePassword',
  Edit = 'ProfileEdit',
}

export const Profile = () => {
  const [fields, setFields] = useState<ProfileParams>({})
  const [page, setPage] = useState(Pages.Show)
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)
  const avatar = useAppSelector(selectUserAvatar)

  useEffect(() => {
    if (user) {
      setFields(user)
    }
  }, [user])

  useEffect(() => {
    api.auth
      .user()
      .then(data =>
        setFields({ ...data, avatar: api.resources.url(data.avatar) })
      )
  }, [avatar])

  const setValue = (k: string, v: string) => {
    dispatch(setAvatar(v))
  }

  const onCloseEdit = (f: ProfileParams) => {
    setFields(f)
    setPage(Pages.Show)
    dispatch(setProfile(f))
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
                <FormEdit fields={fields} close={onCloseEdit} />
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
