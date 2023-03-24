import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import api from '../../../api'

import Brush from '../../../utils/tools/Brush'

interface GameDrawProps {
  currentUserId: number
  socket?: SocketAPIType
}

const GameDraw: FC<GameDrawProps> = ({ currentUserId, socket }) => {
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
      socket.on<SocketContent>('user connected', onUserConnected)
      socket.on<SocketContent>('file', onGetStartImage)
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

  const onUserConnected = async (c: SocketContent) => {
    // нужен ведущий игрок, пока true
    if (currentUserId !== c.user_id) {
      const canvas = canvasRef.current as HTMLCanvasElement

      try {
        const imageBlob = (await new Promise(resolve =>
          canvas.toBlob(resolve as BlobCallback, 'image/png')
        )) as Blob

        // pass our image to yandex server as resource
        const id = await api.resources.add(imageBlob)
        // send all users id of loaded resource
        socket!.sendImage(id)
      } catch {
        console.log('fail send starting image to new user')
      }
    }
  }

  const onGetStartImage = async (c: SocketContent) => {
    if (currentUserId === c.user_id) {
      return
    }
    const ctx = canvasRef.current?.getContext('2d')

    if (ctx) {
      const img = new Image()
      img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0)
      })
      // img.crossOrigin = 'anonymous'
      img.src = api.resources.url(c.file!.path as string)
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
      <canvas ref={canvasRef} width={650} height={600} />
    </div>
  )
}

export default GameDraw
