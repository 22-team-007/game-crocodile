import { memo, useRef, useState } from 'react'
import { Container, ListGroup, Image } from 'react-bootstrap'
import './styles.scss'

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [message, setMessage] = useState('')

  const mouseDownHandler = () => {
    console.log(canvasRef.current)
  }
  const messageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <Container style={{ maxWidth: '1024px' }}>
      <div className="game-wrapper">
        <div className="drawing">
          <canvas
            onMouseDown={() => mouseDownHandler()}
            ref={canvasRef}
            width={650}
            height={650}></canvas>
        </div>

        <div className="chatting">
          <div className="leader-board">
            <h5 className="text-center">Раунд 8 из 15</h5>
            <ListGroup variant="flush" className="leader-board_wrap">
              {['player 1', 'player 2', 'player 3', 'player 4'].map(player => (
                <ListGroup.Item
                  className="d-flex justify-content-between text-white"
                  style={{ border: 'none' }}>
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
              {['message 1', 'message 2', 'message 3', 'message 4'].map(msg => (
                <ListGroup.Item>
                  <span style={{ color: '#00a8f5' }}>player 1</span> {msg}
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
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-right"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path
                  fill="#fff"
                  d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default memo(Game)
