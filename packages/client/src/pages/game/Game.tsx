import WithAuth from '../../hoc/withAuth'

function Game() {
  return (
    <div>
      <h1>Game Page!</h1>
    </div>
  )
}

export default WithAuth(Game)
