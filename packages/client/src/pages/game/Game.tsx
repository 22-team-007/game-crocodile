import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Container,
  ListGroup,
  Image,
  Form,
  Modal,
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap'

import withAuth from '../../hoc/withAuth'
import { useAppSelector } from '../../hooks/useAppSelector'

import api from '../../api'

import { GameChat, GameDraw } from './components'

import './style.scss'

function StartEndGame() {
  const [showStart, setShowStart] = useState(false)
  const handleCloseStart = () => setShowStart(false)
  const handleShowStart = () => setShowStart(true)

  const [showEnd, setShowEnd] = useState(false)
  const handleCloseEnd = () => setShowEnd(false)
  const handleShowEnd = () => setShowEnd(true)

  return (
    <>
      <Button variant="primary" onClick={handleShowStart}>
        Показать начало игры
      </Button>
      <Button variant="primary" onClick={handleShowEnd}>
        Показать окончание игры
      </Button>
      <Modal show={showStart} onHide={handleCloseStart}>
        <Modal.Header closeButton>
          <Modal.Title>Игра началась!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Вы должны объяснить слово
          <br />
          <h1>Арбуз</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseStart}>
            Начать
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEnd} onHide={handleCloseEnd}>
        <Modal.Header closeButton>
          <Modal.Title>Игра окончена!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Вам начислено
          <br />
          <h1>10 баллов!</h1>
          <br />
          Вы заняли
          <h1>1 место!</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEnd}>
            Начать новую игру
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const Game = () => {
  const { chatId } = useParams()

  const [webSocket, setWebSocket] = useState<SocketAPIType>()
  const [gamePlayers, setGamePlayers] = useState<UserType[]>([])
  const [searchedPlayers, setSearchedPlayers] = useState<UserType[]>([])
  const currentUser = useAppSelector(state => state.userData.user)

  useEffect(() => {
    if (typeof chatId === 'string') {
      api.games.users(Number(chatId)).then(setGamePlayers)
      if (currentUser !== null) {
        api.games
          .socketConnect(currentUser.id, Number(chatId))
          .then(setWebSocket)
      }
    }
  }, [currentUser, chatId])

  const searchPlayers = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value
    if (v && v.length >= 3) api.users.search(v).then(setSearchedPlayers)
    else setSearchedPlayers([])
  }

  const addPlayer = (userId: number) => {
    api.games.includeUser(Number(chatId), [userId]).then(() => {
      api.games.users(Number(chatId)).then(setGamePlayers)
    })
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="game-container">
        <div className="game-wrapper">
          {currentUser && (
            <GameDraw currentUserId={currentUser.id} socket={webSocket} />
          )}
          <div className="chatting">
            <div className="leader-board">
              <ListGroup variant="flush" className="leader-board_wrap">
                <ListGroup.Item
                  className="d-flex justify-content-between align-items-center text-white no-border"
                  style={{ cursor: 'pointer' }}>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom-start"
                    overlay={
                      <Popover>
                        <Popover.Header as="h3">
                          Добавление игрока
                        </Popover.Header>
                        <Popover.Body>
                          <Form.Control
                            className="mb-2"
                            onChange={searchPlayers}
                          />
                          <ListGroup>
                            {searchedPlayers?.map(player => (
                              <ListGroup.Item
                                action
                                key={player.id}
                                onClick={() => addPlayer(player.id)}>
                                <Image
                                  src={api.resources.url(player.avatar)}
                                  width={30}
                                  height={30}
                                  roundedCircle={true}
                                />
                                <span className="ms-2">{player.login}</span>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Popover.Body>
                      </Popover>
                    }>
                    <Button className="rounded-circle">&#43;</Button>
                  </OverlayTrigger>
                  <h5 className="text-center">Раунд 8 из 15</h5>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush" className="leader-board_wrap">
                {gamePlayers?.map(player => (
                  <ListGroup.Item
                    key={player.id}
                    className="d-flex justify-content-between text-white no-border">
                    <span>
                      <Image
                        src={api.resources.url(player.avatar)}
                        width={30}
                        height={30}
                        roundedCircle={true}
                      />
                      <span className="user-name">{player.login}</span>
                    </span>
                    <span>80</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <GameChat chatId={Number(chatId)} socket={webSocket} />
          </div>
        </div>
        <StartEndGame />
      </div>
    </Container>
  )
}
export default withAuth(Game)
