import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'

import Brush from '../../../utils/tools/Brush'

interface GameDrawProps {
  currentUserId: number
  socket?: SocketAPIType
  disabled: boolean
}

const GameDraw: FC<GameDrawProps> = ({ currentUserId, socket, disabled }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const brush = useRef<Brush>()

  useEffect(() => {
    if (canvasRef.current) {
      brush.current = new Brush(canvasRef.current, sendCoordinates)

      const brushWidth = localStorage.getItem('brushWidth')
      const brushColor = localStorage.getItem('brushColor')

      if (brushWidth) brush.current.lineWidth = Number(brushWidth)

      if (brushColor) {
        brush.current.strokeColor = brushColor
        brush.current.fillColor = brushColor
      }
    }

    if (socket !== undefined) {
      socket.on<SocketContent>('coordinates', onCoordinates)
      socket.on<SocketContent>('clear', onClear)
    }
  }, [socket])

  const clear = () => {
    if (brush.current && socket !== undefined) {
      socket.sendContent('clear', {})
    }
  }

  const sendCoordinates = (content: Coordinate[]) => {
    if (brush.current && socket !== undefined) {
      socket.sendContent('coordinates', {
        content,
        color: brush.current.strokeColor,
      })
    }
  }

  const onClear = () => {
    if (brush.current) {
      brush.current.clear()
    }
  }

  const onCoordinates = (c: SocketContent) => {
    if (brush.current && currentUserId !== c.user_id) {
      brush.current.drawArray(c.content as Coordinate[], c.color || '#000000')
    }
  }

  const changeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
    if (brush.current) {
      const brushWidth = e.target.value

      brush.current.lineWidth = Number(brushWidth)

      localStorage.setItem('brushWidth', brushWidth)
    }
  }

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (brush.current) {
      const brushColor = e.target.value

      brush.current.strokeColor = brushColor
      brush.current.fillColor = brushColor

      localStorage.setItem('brushColor', brushColor)
    }
  }

  return (
    <div>
      <div className="d-flex">
        {!disabled && <button onClick={clear}>clear</button>}
        <Form.Control
          type="color"
          onChange={changeColor}
          defaultValue={localStorage.getItem('brushColor') || '#000000'}
        />

        <input
          onChange={changeLineWidth}
          type="range"
          className="mx-1"
          defaultValue={localStorage.getItem('brushWidth') || 1}
          min={1}
          max={20}
        />
      </div>
      <canvas className={`${disabled ? 'readonly' : ''}`} ref={canvasRef} width={650} height={600} />
    </div>
  )
}

export default GameDraw
