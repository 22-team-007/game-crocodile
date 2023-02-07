import { useRef, useState } from 'react'
import { Container, ListGroup, Image } from 'react-bootstrap'

import './styles.scss'
import Arrow from '../../assets/arrow.svg'

const Game = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mockMessages = ['message 1', 'message 2', 'message 3', 'message 4']
  const mockPlayers = ['player 1', 'player 2', 'player 3', 'player 4']
  const [message, setMessage] = useState('')

  const mouseDownHandler = () => {
    console.log(canvasRef.current)
  }

  const messageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <Container className="game-container">
      <div className="game-wrapper">
        <div className="drawing">
          <canvas
            onMouseDown={mouseDownHandler}
            ref={canvasRef}
            width={650}
            height={650}
          />
        </div>

        <div className="chatting">
          <div className="leader-board">
            <h5 className="text-center">Раунд 8 из 15</h5>
            <ListGroup variant="flush" className="leader-board_wrap">
              {mockPlayers.map((player, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between text-white no-border">
                  <span>
                    <Image
                      src={'https://via.placeholder.com/30/FFA500'}
                      width={30}
                      height={30}
                      roundedCircle={true}
                    />
                    <span className="user-name">{player}</span>
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
    </Container>
  )
}
export default Game
