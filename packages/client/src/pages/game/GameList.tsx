import { useEffect, useState } from 'react'
import { Container, ListGroup, ButtonGroup, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import api from '../../api'
import withAuth from '../../hoc/withAuth'

const GameList = () => {
  const [gameList, setGameList] = useState<GameType[]>([])
  const [currentUser, setCurrentUser] = useState<UserType>();

  useEffect(() => {
    api.games.get().then(setGameList)
    api.auth.user().then(setCurrentUser)
    const intervalList = setInterval(()=>{
      api.games.get().then(setGameList)
    },10000)
    return () => {
      clearInterval(intervalList);
    }
  }, [])

  const creatGame = () => {
    api.games.create(`Игра ${currentUser?.login} от ${new Date().toLocaleString()}`).then(()=>{
      api.games.get().then(setGameList)
    })
  }

  const deleteGame = (chatId:number) => {
    api.games.delete(chatId).then(()=>{
      api.games.get().then(setGameList)
    })
  }

  const leaveGame = (chatId:number) => {
    if(!currentUser) return;
    api.games.excludeUser(chatId,[currentUser.id]).then(()=>{
      api.games.get().then(setGameList)
    }).catch(console.error)
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Card style={{
        width:'100%',
        maxWidth:'960px',
        minHeight:'480px',
        maxHeight:'700px'
      }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>Список игр</Card.Title>
          <Button variant='success' onClick={creatGame}>Создать игру</Button>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {gameList.map(game => (
              <ListGroup.Item className="d-flex justify-content-between align-items-start" key={game.id}>
                {game.title}
                <ButtonGroup size="sm">
                  <Link className="btn btn-primary"  to={`/game/${game.id}`}>Открыть</Link>
                  {game.created_by===currentUser?.id && <Button variant="danger" onClick={()=>deleteGame(game.id)}>Удалить</Button>}
                  {game.created_by!==currentUser?.id && <Button variant="warning" onClick={()=>leaveGame(game.id)}>Покинуть</Button>}
                </ButtonGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}
export default withAuth(GameList)
