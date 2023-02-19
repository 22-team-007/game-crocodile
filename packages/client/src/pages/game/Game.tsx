import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Container, ListGroup, Image, Form, Modal, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import { useParams } from 'react-router';

import Arrow from '../../assets/arrow.svg'
import Brush from '../../utils/tools/Brush'
import withAuth from '../../hoc/withAuth'

import api from '../../api'

import './styles.scss'

const mockMessages = ['message 1', 'message 2', 'message 3', 'message 4']

function StartEndGame() {
  const [showStart, setShowStart] = useState(false);
  const handleCloseStart = () => setShowStart(false);
  const handleShowStart = () => setShowStart(true);

  const [showEnd, setShowEnd] = useState(false);
  const handleCloseEnd = () => setShowEnd(false);
  const handleShowEnd = () => setShowEnd(true);

  return (
    <>
      <Button variant="primary" onClick={handleShowStart}>Показать начало игры</Button>
      <Button variant="primary" onClick={handleShowEnd}>Показать окончание игры</Button>
      <Modal show={showStart} onHide={handleCloseStart}>
        <Modal.Header closeButton>
          <Modal.Title>Игра началась!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Вы должны объяснить слово<br/>
          <h1>Арбуз</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseStart}>Начать</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEnd} onHide={handleCloseEnd}>
        <Modal.Header closeButton>
          <Modal.Title>Игра окончена!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Вам начислено<br/>
          <h1>10 баллов!</h1><br/>
          Вы заняли
          <h1>1 место!</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEnd}>Начать новую игру</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Game = () => {
  const { chatId } = useParams();

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const brush = useRef<Brush>()
  const [message, setMessage] = useState('')
  const [gamePlayers, setGamePlayers] = useState<UserType[]>([]);
  const [searchedPlayers, setSearchedPlayers] = useState<UserType[]>([]);

  useEffect(() => {
    api.games.users(Number(chatId)).then(setGamePlayers)
    brush.current = new Brush(canvasRef.current!)
  }, [])

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    brush.current!.strokeColor = e.target.value
    brush.current!.fillColor = e.target.value
  }

  const messageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const searchPlayers = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    if(v && v.length>=3)
      api.users.search(v).then(setSearchedPlayers)
    else
      setSearchedPlayers([])
  }

  const addPlayer = (userId:number) => {
    api.games.includeUser(Number(chatId),[userId]).then(()=>{
      api.games.users(Number(chatId)).then(setGamePlayers)
    })
  }

  return (<>
    <Container className="game-container">
      <div className="game-wrapper">
        <div className="drawing">
          <Form.Control type="color" onChange={changeColor}/>
          <canvas
            ref={canvasRef}
            width={650}
            height={600}
          />
        </div>

        <div className="chatting">
          <div className="leader-board">
            <ListGroup variant="flush" className="leader-board_wrap">
              <ListGroup.Item className="d-flex justify-content-between align-items-center text-white no-border" style={{cursor: 'pointer'}}>
                <OverlayTrigger trigger="click" placement="bottom-start" overlay={
                  <Popover>
                    <Popover.Header as="h3">Добавление игрока</Popover.Header>
                    <Popover.Body>
                      <Form.Control className="mb-2" onChange={searchPlayers}/>
                      <ListGroup>
                      {searchedPlayers?.map(player => (
                        <ListGroup.Item action key={player.id} onClick={() => addPlayer(player.id)}>
                          <Image
                            src={api.resources.url(player.avatar)}
                            width={30}
                            height={30}
                            roundedCircle={true}
                          />
                          <span className='ms-2'>{player.login}</span>
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
              <ListGroup.Item key={player.id} className="d-flex justify-content-between text-white no-border">
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
          <div className="chat">
            <ListGroup variant="flush">
              {mockMessages.map((msg, index) => (
                <ListGroup.Item key={index}>
                  <span className="name-color">player 1</span> {msg}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="send-message">
            <input
              type="text"
              onChange={messageHandler}
              value={message}
              placeholder="Напишите сообщение"
            />
            <button type="submit">
              <img src={Arrow} alt="submit" />
            </button>
          </div>
        </div>
      </div>
      <StartEndGame/>
    </Container>
  </>)
}
export default withAuth(Game)
