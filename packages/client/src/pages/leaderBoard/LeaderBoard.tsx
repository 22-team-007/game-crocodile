import { useLoaderData } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import { Leader } from './components/Leader'
import { TopLeader } from './components/TopLeader'
import api from '../../api'
import withAuth from '../../hoc/withAuth'

import './style.scss'

export async function leaderBoardLoader() {
  let leadsIdScore: LeaderType[]

  try {
    leadsIdScore = await api.leaderbord.all()
  } catch (error) {
    console.log(error)
    return null
  }

  const rawLeaders: (LeaderUserType | undefined)[] = await Promise.all(
    leadsIdScore.map(async leader => {
      try {
        if (leader.id) {
          const user = await api.users.get(leader.id)
          return { ...user, score: leader.score } as LeaderUserType
        }
      } catch {
        console.log(`Cant get user info with id ${leader.id}`)
      }
    })
  )

  const leaders = rawLeaders.filter(
    leader => leader !== undefined
  ) as LeaderUserType[]

  leaders.sort((a, b) => {
    const ret = Number(b?.score) - Number(a?.score)
    return ret
  })

  return leaders
}

const LeaderBoard = () => {
  let leaders: LeaderUserType[]

  try {
    leaders = useLoaderData() as LeaderUserType[]
  } catch (error) {
    console.log(error)
    return <></>
  }

  if (!leaders || leaders.length === 0) {
    return (
      <div className="leaders container">
        <div className="empty-msg">
          <div className="msg">пока нет лидеров</div>
        </div>
      </div>
    )
  }

  // get first 3 and other leaders
  const supLeads = leaders.slice(0, 3)
  const othLeads = leaders.slice(3)

  return (
    <Container className="leaders container" style={{ maxWidth: '960px' }}>
      <h1 className="mt-4 text-center text-uppercase">Лидеры игры</h1>
      <Row className="mt-5">
        <Col className="mb-4 mb-md-5 col-md-12 d-flex justify-content-center">
          {supLeads[0] && (
            <div className="grand-place">
              <TopLeader user={supLeads[0]} title="Первое место" />
            </div>
          )}
        </Col>
        <Col className="mb-4 col-md-6 d-flex justify-content-center">
          {supLeads[1] && (
            <div className="grand-place">
              <TopLeader user={supLeads[1]} title="Второе место" />
            </div>
          )}
        </Col>
        <Col className="mb-4 col-md-6 d-flex justify-content-center">
          {supLeads[2] && (
            <div className="grand-place">
              <TopLeader user={supLeads[2]} title="Третье место" />
            </div>
          )}
        </Col>
      </Row>
      <Row className="list-hero mt-4">
        {othLeads.map((leader, index) => {
          return (
            <Col
              className="col-md-6 mt-3 d-flex justify-content-center"
              key={leader.id}>
              <div className="grand-place d-flex justify-content-center align-items-center">
                <div className="position">{index + 4}:</div>
                <Leader {...leader} />
              </div>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default withAuth(LeaderBoard)
// export default LeaderBoard
