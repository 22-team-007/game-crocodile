import { useLoaderData } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Leader, IsLeader } from '../../components/Leader'
import { TopLeader } from '../../components/TopLeader'
import ApiLB from '../../api/leaderbord'
import ApiUsers from '../../api/users'
import ApiRes from '../../api/resources'
import './style.scss'

export async function leaderBoardLoader() {
  let leaders: IsLeader[] | LeaderType[]

  // create api
  const apiLB = new ApiLB()
  const apiUsers = new ApiUsers()
  const apiRes = new ApiRes()

  // get list of all leaders
  leaders = await apiLB.all()

  // get users by id
  leaders = await Promise.all(
    leaders.map(async leader => {
      // now user id is hardcoded, because bd store fake id
      const user = await apiUsers.get(leader.id)

      user.avatar = apiRes.url(user.avatar)
      return { ...user, ...leader }
    })
  )

  return leaders
}

const LeaderBoard = () => {
  let leaders: IsLeader[]

  try {
    leaders = useLoaderData() as IsLeader[]
  } catch (error) {
    // something wrowg probably component invoke without router
    console.log(error)
    return <></>
  }

  if (leaders.length === 0) {
    return (
      <div className="leaders container">
        <div className="empty-msg">
          <div className="msg">пока нет лидеров</div>
        </div>
      </div>
    )
  }

  const Sortedleaders = leaders.sort((a: IsLeader, b: IsLeader) =>
    a.score > b.score ? -1 : 1
  ) as IsLeader[]

  // get first 3 and other leaders
  const supLeads = Sortedleaders.slice(0, 3)
  const othLeads = Sortedleaders.slice(3)

  return (
    <div className="leaders container">
      <h1 className="mt-4 text-center text-uppercase">Лидеры игры</h1>
      <Row className="mt-5">
        <Col className="mb-4 mb-md-5 col-md-12 d-flex justify-content-center">
          {supLeads[0] ? (
            <TopLeader {...supLeads[0]} title="Первое место" />
          ) : (
            ''
          )}
        </Col>
        <Col className="mb-4 col-md-6 d-flex justify-content-center">
          {supLeads[1] ? (
            <TopLeader {...supLeads[1]} title="Второе место" />
          ) : (
            ''
          )}
        </Col>
        <Col className="mb-4 col-md-6 d-flex justify-content-center">
          {supLeads[2] ? (
            <TopLeader {...supLeads[2]} title="Третье место" />
          ) : (
            ''
          )}
        </Col>
      </Row>
      <Row className="list-hero mt-4">
        {othLeads.map((leader, index) => {
          return (
            <Col
              className="d-flex col-md-6 justify-content-center align-items-center"
              key={leader.id}>
              <div className="position">{index + 4}:</div>
              <Leader {...leader} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default LeaderBoard
