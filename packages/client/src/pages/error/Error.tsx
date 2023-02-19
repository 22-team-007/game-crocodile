import { useRouteError } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type ErrorResponse = {
  data: any
  status: number
  statusText: string
  message?: string
}

const DEFAULT_ERROR = {
  data: null,
  status: 404,
  statusText: 'Что-то пошло не так',
  message: 'Что-то пошло не так',
}

export default function ErrorPage() {
  const error = (useRouteError() || DEFAULT_ERROR) as ErrorResponse

  const errMsg =
    error.status === 404
      ? 'Страница не существует'
      : 'Извините, произошла неожиданная ошибка.'

  return (
    <div className="App">
    <Container className='d-flex justify-content-center align-items-center'>
    <div id="error-page">
    <Card>
      <Card.Title>
        <h1>Oops!</h1>
      </Card.Title>
      <Card.Body>
      <p>{errMsg}</p>
      <div className='error-page__message'>
        <i>{error.statusText || error.message}</i>
      </div>
      <div className='error-page__links mt-4'>{
      <Link to={'/'}>Вернуться на главную страницу</Link>
      }</div>
    </Card.Body>
    </Card>
    </div>
    </Container>
    </div>
  )
}
