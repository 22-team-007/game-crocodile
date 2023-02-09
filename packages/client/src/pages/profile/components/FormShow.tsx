import { FC } from 'react'
import { Row, Col } from 'react-bootstrap'

type FormShowProps = {
  fields: ProfileParams
}

const FormShow: FC<FormShowProps> = ({fields}) => {
  return <>
    <Row>
      <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>Имя:</Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{fields.first_name}</Col>
    </Row>
    <Row>
      <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>Фамилия:</Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{fields.second_name}</Col>
    </Row>
    <Row>
      <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>Псевдоним:</Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{fields.display_name}</Col>
    </Row>
    <Row>
      <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>Логин:</Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{fields.login}</Col>
    </Row>
    <Row>
      <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>Email:</Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{fields.email}</Col>
    </Row>
    <Row>
      <Col style={{fontSize: '14pt', textAlign: 'right', fontWeight: 'bold'}}>Телефон:</Col>
      <Col style={{ fontSize: '14pt', textAlign: 'left' }}>{fields.phone}</Col>
    </Row>
  </>
}

export default FormShow;