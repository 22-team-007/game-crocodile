import { memo, useRef } from 'react'
import { Container, ListGroup, Image } from 'react-bootstrap'
import './styles.scss'

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  return (
    <Container style={{ maxWidth: '1024px' }}>
      <div className="game-wrapper">
        <div className="drawing">
          <canvas ref={canvasRef} width={650} height={650}></canvas>
        </div>

        <div className="chatting">
          <div className="leader-board">
            <div className="flex">
                <Image src={"https://via.placeholder.com/30/"} width={30} height={30} roundedCircle={true}/>
                <span>name</span>
            </div>
        
          </div>
          <div className="chat">
            <ListGroup  variant="flush" style={{ borderRadius: '0' }}>
              <ListGroup.Item>Primary</ListGroup.Item>
              <ListGroup.Item>Primary</ListGroup.Item>
              <ListGroup.Item>Primary</ListGroup.Item>
              <ListGroup.Item>Primary</ListGroup.Item>

            </ListGroup>
            
          </div>
        </div>
      </div>
    </Container>
  )
}
export default memo(Game)
