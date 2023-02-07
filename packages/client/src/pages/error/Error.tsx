import { useRouteError } from 'react-router-dom'

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
    <div id="error-page">
      <h1>Oops!</h1>

      <p>{errMsg}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
