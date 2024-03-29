import { ChangeEvent, FC, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import api from '../../../api'

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

      const brushWidth = typeof localStorage !== "undefined" && localStorage.getItem('brushWidth')
      const brushColor = typeof localStorage !== "undefined" && localStorage.getItem('brushColor')

      if (brushWidth) {
        brush.current.lineWidth = Number(brushWidth)
      }
      if (brushColor) {
        brush.current.strokeColor = brushColor
        brush.current.fillColor = brushColor
      }
    }

    if (socket !== undefined) {
      socket.on<SocketContent>('coordinates', onCoordinates)
      socket.on<SocketContent>('user connected', onUserConnected)
      socket.on<SocketContent>('file', onGetStartImage)
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
        lineWidth: brush.current.lineWidth
      })
    }
  }

  const onClear = () => {
    if (brush.current) {
      brush.current.clear()
    }
  }

  const onUserConnected = async (c: SocketContent) => {

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
      brush.current.drawArray(c.content as Coordinate[], c.color || '#000000',  c.lineWidth || 1)
    }
  }

  const changeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
    if (brush.current) {
      const brushWidth = e.target.value

      brush.current.lineWidth = Number(brushWidth)

      typeof localStorage !== "undefined" && localStorage.setItem('brushWidth', brushWidth)
    }
  }

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (brush.current) {
      const brushColor = e.target.value

      brush.current.strokeColor = brushColor
      brush.current.fillColor = brushColor

      typeof localStorage !== "undefined" && localStorage.setItem('brushColor', brushColor)
    }
  }

  return (
    <>
      <canvas className={`${disabled ? 'readonly' : ''}`} ref={canvasRef} width={650} height={600} />
      {!disabled && (
        <div className="tools-wrap p-2">
          <span className="d-flex">
            <Form.Control
              type="color"
              onChange={changeColor}
              defaultValue={typeof localStorage !== "undefined" && localStorage.getItem('brushColor') || '#000000'}
            />

            <input
              onChange={changeLineWidth}
              type="range"
              className="mx-1"
              defaultValue={typeof localStorage !== "undefined" && localStorage.getItem('brushWidth') || '1'}
              min={1}
              max={20}
            />
          </span>
          <Button onClick={clear} variant="danger">Очистить</Button>
        </div>
      )}
    </>
  )
}

export default GameDraw
