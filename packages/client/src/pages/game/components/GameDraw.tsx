import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'

import Brush from '../../../utils/tools/Brush'

interface GameDrawProps {
  currentUserId: number
  socket?: SocketAPIType
}

const GameDraw: FC<GameDrawProps> = ({ currentUserId, socket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const brush = useRef<Brush>()

  useEffect(() => {
    if (canvasRef.current)
      brush.current = new Brush(canvasRef.current, sendCoordinates)
    if (socket !== undefined) {
      socket.on<SocketContent>('coordinates', onCoordinates)
      socket.getMessages('0')
    }
  }, [socket])

  const sendCoordinates = (content: Coordinate[]) => {
    if (brush.current && socket !== undefined) {
      socket.sendContent('coordinates', {
        content,
        color: brush.current.strokeColor,
      })
    }
  }

  const onCoordinates = (c: SocketContent) => {
    if (brush.current && currentUserId !== c.user_id) {
      brush.current.drawArray(c.content as Coordinate[], c.color || '#000000')
    }
  }

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (brush.current) {
      brush.current.strokeColor = brush.current.fillColor = e.target.value
    }
  }

  return (
    <>
      <div className="drawing">
        <Form.Control type="color" onChange={changeColor} />
        <canvas ref={canvasRef} width={650} height={600} />
      </div>
    </>
  )
}

export default GameDraw
