import WithAuth from '../../hoc/withAuth'

function Login() {
  return (
    <div>
      <h1>Login page</h1>
    </div>
  )
}

export default WithAuth(Login, '/game')
