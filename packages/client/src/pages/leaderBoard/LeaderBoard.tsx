import { useLoaderData } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Leader } from './components/Leader'
import { TopLeader } from './components/TopLeader'

import { leadersData } from './data'

import './style.scss'

export async function leaderBoardLoader() {
  const leaders: TopUser[] = leadersData

  return leaders
}

const LeaderBoard = () => {
  let leaders: TopUser[]

  try {
    leaders = useLoaderData() as TopUser[]
  } catch (error) {
    // something wrowg probably component invoke without router
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

  const Sortedleaders = leaders.sort((a: TopUser, b: TopUser) =>
    a.score > b.score ? -1 : 1
  ) as TopUser[]

  // get first 3 and other leaders
  const supLeads = Sortedleaders.slice(0, 3)
  const othLeads = Sortedleaders.slice(3)

  return (
    <div className="leaders container">
      <h1 className="mt-4 text-center text-uppercase">Лидеры игры</h1>
      <Row className="mt-5">
        <Col className="mb-4 mb-md-5 col-md-12 d-flex justify-content-center">
          {supLeads[0] && (
            <div className="grand-place">
              <TopLeader {...supLeads[0]} title="Первое место" />
            </div>
          )}
        </Col>
        <Col className="mb-4 col-md-6 d-flex justify-content-center">
          {supLeads[1] && (
            <div className="grand-place">
              <TopLeader {...supLeads[1]} title="Второе место" />
            </div>
          )}
        </Col>
        <Col className="mb-4 col-md-6 d-flex justify-content-center">
          {supLeads[2] && (
            <div className="grand-place">
              <TopLeader {...supLeads[2]} title="Третье место" />
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
    </div>
  )
}

export default LeaderBoard
