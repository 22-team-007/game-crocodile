import { useRouteError } from 'react-router-dom'

type ErrorResponse = {
  data: any
  status: number
  statusText: string
  message?: string
}

export default function ErrorPage() {
  let error = (useRouteError() as ErrorResponse) || undefined

  if (error === undefined) {
    error = {
      data: null,
      status: 200,
      statusText: 'Ok',
      message: 'Ok',
    }
  }

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
