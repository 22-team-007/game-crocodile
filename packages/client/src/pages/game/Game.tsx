import { ChangeEvent, useEffect, useRef, useState } from 'react'
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

  const TIME = 60

  const [webSocket, setWebSocket] = useState<SocketAPIType>()
  const [isDisabledCanvas, setDisabledCanvas] = useState(true)
  const [isDisabledChat, setDisabledChat] = useState(false)
  const [gamePlayers, setGamePlayers] = useState<UserType[]>([])
  const [lead, setLeading] = useState<number>()
  const [leadingPlayerName, setLeadingPlayerName] = useState<string>()
  const [searchedPlayers, setSearchedPlayers] = useState<UserType[]>([])
  const currentUser = useAppSelector(state => state.userData.user)
  const varWord = useRef<string>('')

  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const timeOut = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (chatId) {
      api.games.users(Number(chatId)).then(setGamePlayers)
      if (currentUser !== null) {
        api.games
          .socketConnect(currentUser.id, Number(chatId))
          .then(setWebSocket)
      }
    }

    return () => webSocket?.close()
  }, [currentUser, chatId])

  useEffect(() => {
    if (webSocket !== undefined && gamePlayers.length > 1) {
      setLeadingPlayer(gamePlayers[gamePlayers.length - 1].id)
      webSocket.on<SocketContent>('text', checkWord)
      webSocket.on<SocketContent>('setLeadingPlayer', onSetLeading)
    }
  }, [webSocket, gamePlayers])

  useEffect(() => {
    if (webSocket !== undefined && timerActive) {
      if (seconds > 0) {
        timeOut.current = setTimeout(setSeconds, 1000, seconds - 1)
      } else {
        console.log('вы не успели, переход хода')
        const nextPlayer = gamePlayers.filter(player => {
          return player.id !== currentUser?.id
        })
        setLeadingPlayer(nextPlayer[0].id)
      }
    }
    return () => {
      clearTimeout(timeOut.current as NodeJS.Timeout)
    }
  }, [seconds, webSocket, timerActive])

  const checkWord = (res: SocketContent) => {
    if (
      res.user_id !== undefined &&
      res?.content?.toString().toLowerCase() === varWord.current.toLowerCase()
    ) {
      if (res.user_id === currentUser?.id) {
        alert('Вы угадали!')
        //начисляем баллы
      }
      setLeadingPlayer(res.user_id)
    }
  }
  const onSetLeading = (res: SocketContent) => {
    if (res.user_id !== undefined && res.content === currentUser?.id) {
      api.games.getWord().then(w=>{
        varWord.current = w
      })
      setLeading(Number(res.content))
      setSeconds(TIME)
      setTimerActive(true)
      //разрешаем рисовать, запрещаем писать
      setDisabledCanvas(false)
      setDisabledChat(true)
    } else {
      varWord.current = ''
      setSeconds(0)
      setTimerActive(false)
      setDisabledCanvas(true)
      setDisabledChat(false)
    }
  }
  const setLeadingPlayer = (id: number) => {
    setLeading(id)

    webSocket!.sendContent('clear', {})

    gamePlayers.filter(player => {
      if (player.id === id) {
        setLeadingPlayerName(player.first_name)
      }
    })
    webSocket!.sendContent('setLeadingPlayer', {
      content: id,
    })
  }
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
        <div>
          {gamePlayers.length <= 1 && <span>Пригласите других игроков</span>}
          {lead === currentUser?.id && seconds > 0 && (
            <>
              <span>Вы ведущий, ваше слово - {varWord.current}</span>
              <span style={{ marginLeft: 150 }}>
                Осталось времени: {seconds}
              </span>
            </>
          )}
          {lead !== currentUser?.id && leadingPlayerName && (
            <span>Рисует: {leadingPlayerName}</span>
          )}
        </div>
        <div className="game-wrapper">
          {currentUser && (
            <GameDraw
              disabled={isDisabledCanvas}
              currentUserId={currentUser.id}
              socket={webSocket}
            />
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
            <GameChat
              disabled={isDisabledChat}
              chatId={Number(chatId)}
              socket={webSocket}
            />
          </div>
        </div>
        <StartEndGame />
      </div>
    </Container>
  )
}
export default withAuth(Game)
