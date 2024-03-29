import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import {
  Container,
  ListGroup,
  Image,
  Form,
  Button,
  OverlayTrigger,
  Popover,
  Toast,
  ToastContainer,
} from 'react-bootstrap'

import withAuth from '../../hoc/withAuth'
import { useAppSelector } from '../../hooks/useAppSelector'

import api from '../../api'
import { sound } from '../../utils/sound'

import { GameChat, GameDraw } from './components'
import withErrorBoundary from '../../hoc/withErrorBoundary'
import './style.scss'

type AutohideToast = {
  show: boolean
  setShow: (value: boolean) => void,
  text: string
}
function AutohideToast({ show, setShow, text }: AutohideToast) {
  return (
    <ToastContainer className="p-3" position={"top-center"}>
      <Toast bg="info" onClose={() => setShow(false)} show={show} delay={4000} autohide>
        <Toast.Header>
          <h5 className="me-auto">{text}</h5>
        </Toast.Header>
        <Toast.Body>Продолжаем игру...</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

interface GamePopupsProps {
  currentUserId: number | undefined
  lead: number | undefined
  isActivePopup: boolean
  secondsPopup: number
  setIsActive: (value: boolean) => void
  word: string
}

const GamePopup: FC<GamePopupsProps> = ({
  lead,
  currentUserId,
  isActivePopup,
  secondsPopup,
  setIsActive,
  word,
}) => {
  return (
    <>
      {lead === currentUserId && isActivePopup && word && secondsPopup > 0 && (
        <div className="popup-info">
          <div className="popup-info__inner">
            <h3>
              Вы ведущий, объясните слово <br />
              <strong>"{word}"</strong>
            </h3>
            <Button
              onClick={() => setIsActive(false)}
              className="mt-2"
              variant="primary">
              Начать игру {secondsPopup}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

const Game = () => {
  const { chatId } = useParams()

  const TIME = 60
  const secondsToHidePopup = 10
  const scoreCount = 10

  const [webSocket, setWebSocket] = useState<SocketAPIType>()
  const [isDisabledCanvas, setDisabledCanvas] = useState(true)
  const [isDisabledChat, setDisabledChat] = useState(false)
  const [gamePlayers, setGamePlayers] = useState<UserType[]>([])
  const [scoreLeaders, setScoreLeaders] = useState<UserType[]>([])
  const [lead, setLeading] = useState<number>()
  const [leadingPlayerData, setLeadingPlayerData] = useState<UserType>()
  const [searchedPlayers, setSearchedPlayers] = useState<UserType[]>([])
  const currentUser = useAppSelector(state => state.userData.user)
  const nextPlayer = gamePlayers.filter(player => {
    return player?.id !== currentUser?.id
  })
  const varWord = useRef<string>('')

  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  const [secondsPopup, setSecondsPopup] = useState(0)
  const [isActivePopup, setIsActivePopup] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  useEffect(() => {
    if (chatId) {
      api.games.users(Number(chatId)).then(setGamePlayers)
      if (currentUser !== null) {
        api.games
          .socketConnect(currentUser.id, Number(chatId))
          .then(setWebSocket)
        /*api.leaderbord.add(Number(chatId), currentUser?.id, 0).then(() => {
          setScore(currentUser.id)
        })*/
      }
    }

    return () => webSocket?.close()
  }, [currentUser, chatId])

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (webSocket !== undefined && gamePlayers && gamePlayers.length > 1) {
      webSocket.on<SocketContent>('text', checkWord)
      webSocket.on<SocketContent>('setLeadingPlayer', onSetLeading)
      
      let leaderId2 = 0;
      timeout = setTimeout(() => {
        if(leaderId2 === 0){
          leaderId2 = currentUser.id
          setLeadingPlayer(leaderId2, true)
        }
      }, 5000);
      webSocket.on<SocketContent>('user connected', (res: SocketContent) => {
        if(res.content === undefined) return
        if(leaderId2 === currentUser.id){
          webSocket.sendContent('sys msg', {content: 'leader'})
        }
      })
      webSocket.on<SocketContent>('sys msg', (res: SocketContent) => {
        if (res.user_id === undefined) return 
        leaderId2 = res.user_id
        setLeading(leaderId2)
      })
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [webSocket, gamePlayers])
  

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined

    if (webSocket !== undefined && timerActive) {
      if (seconds > 0) {
        timeout = setTimeout(setSeconds, 1000, seconds - 1)
      } else if (lead === currentUser?.id) {
        setToastText('Вы не успели, переход хода')
        setShowToast(true)
        webSocket!.sendContent('clear', {})
        setLeadingPlayer(nextPlayer[0].id, true)
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [seconds, webSocket, timerActive])

  useEffect(() => {
    let timeOutPopup: NodeJS.Timeout | undefined

    if (webSocket !== undefined && isActivePopup) {
      if (secondsPopup > 0) {
        timeOutPopup = setTimeout(setSecondsPopup, 1000, secondsPopup - 1)
      } else {
        setToastText('Превышено время ожидания старта')
        setShowToast(true)
        setIsActivePopup(false)
        webSocket!.sendContent('clear', {})
        setLeadingPlayer(nextPlayer[0].id, true)
      }
    }
    return () => {
      if (timeOutPopup) {
        clearTimeout(timeOutPopup)
      }
    }
  }, [webSocket, secondsPopup, isActivePopup])

  const checkWord = (res: SocketContent) => {
    if (
      res.user_id !== undefined &&
      res?.content?.toString().toLowerCase() === varWord.current.toLowerCase()
    ) {
      api.leaderbord.add(Number(chatId), Number(res.user_id), scoreCount).then(()=>{
        webSocket!.sendContent('clear', {})
        setLeadingPlayer(Number(res.user_id))
      })
    }
  }

  const makeRowLeaders = async function (team: LeaderType[]): Promise<LeaderUserType[]> {
    return await Promise.all(
      team.map(p => {
        return new Promise<LeaderUserType>((resolve)=>{
          api.users.get(p.id).then(user=>{
            resolve({ ...user, score: p.score } as LeaderUserType)
          })
        })
      })
    )
  }

  const setScore = async () => {
    const leadsIdScore = await api.leaderbord.team(`team${chatId}`)
    const rawLeaders = await makeRowLeaders(leadsIdScore)
    setScoreLeaders(rawLeaders as LeaderUserType[])
  }

  const onSetLeading = (res: SocketContent) => {
    setSeconds(TIME)
    setTimerActive(true)
    setDisabledCanvas(true)
    setDisabledChat(true)
    setIsActivePopup(false)
    varWord.current = ''
    setScore()
    if (res.user_id !== undefined && res.content === currentUser?.id) {
      api.games.getWord().then(w => {
        varWord.current = w
        setLeading(Number(res.content))
        setSecondsPopup(secondsToHidePopup)
        setIsActivePopup(true)
        setDisabledCanvas(false)

        if (!res.withoutSetScore) {
          setToastText('Вы угадали, начислено 10 баллов!')
          setShowToast(true)
          sound.play('YouWon')
        }
      })
    } else {
      setDisabledChat(false)
    }
  }

  const setLeadingPlayer = (id: number, withoutSetScore = false) => {
    setLeading(id)
    gamePlayers.filter(player => {
      if (player.id === id) {
        setLeadingPlayerData(player)
      }
    })
    webSocket!.sendContent('setLeadingPlayer', {
      content: id,
      withoutSetScore: withoutSetScore,
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
        <div className="game-wrapper">
          <div className={isActivePopup ? 'popup-active' : ''}>
            <div className="d-flex justify-content-between align-items-center p-2">
              {gamePlayers && gamePlayers.length <= 1 && (
                <span>Пригласите других игроков</span>
              )}
              {leadingPlayerData && (
                <span>
                  <Image
                    width={50}
                    height={50}
                    src={api.resources.url(leadingPlayerData.avatar)}
                    roundedCircle={true}
                    alt="avatar"
                  />
                  <span style={{ marginLeft: 10 }}>
                    {leadingPlayerData.first_name}
                  </span>
                </span>
              )}
              {lead === currentUser?.id && seconds > 0 && (
                <>
                  <ul className="word">
                    {[...varWord.current].map((letter, i) => (
                      <li key={i} className="word-letter">{letter}</li>
                    ))}
                  </ul>
                </>
              )}
              {seconds > 0 && <span className="timer">{seconds}</span>}
            </div>
            {currentUser && (
              <GameDraw
                disabled={isDisabledCanvas}
                currentUserId={currentUser.id}
                socket={webSocket}
              />
            )}
            <GamePopup
              word={varWord.current}
              lead={lead}
              secondsPopup={secondsPopup}
              setIsActive={setIsActivePopup}
              isActivePopup={isActivePopup}
              currentUserId={currentUser?.id}
            />
          </div>
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
                    <Button title="Добавить игрока" className="rounded-circle">&#43;</Button>
                  </OverlayTrigger>
                  <h5 className="text-center">Таблица лидеров</h5>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush" className="leader-board_wrap">
                {!scoreLeaders || scoreLeaders.length === 0 && (
                   <ListGroup.Item>
                      <div className="empty-msg">
                        <div className="msg">Пока нет лидеров</div>
                      </div>
                    </ListGroup.Item>
                )}
                {scoreLeaders?.map(player => (
                  <ListGroup.Item
                    key={player.login}
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
                    <span>{player.score ? player.score : 0}</span>
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
        <AutohideToast show={showToast} text={toastText} setShow={setShowToast} />
      </div>
    </Container>
  )
}
export default withAuth(withErrorBoundary(Game))
