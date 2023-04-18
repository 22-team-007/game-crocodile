import { ChangeEvent, FC, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'

import api from '../../../api'

import Arrow from '../../../assets/arrow.svg'

interface GameChatProps {
  chatId: number
  socket?: SocketAPIType
  disabled: boolean
}

const GameChat: FC<GameChatProps> = ({ socket, disabled }) => {
  const [messageList, setMessageList] = useState<SocketMessage[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (socket !== undefined) {
      socket.on<SocketContent>('text', onText)
    }
  }, [socket])

  const onText = (res: SocketContent) => {
    if (res.user_id !== undefined) {
      api.users.get(res.user_id).then((user: UserType) => {
        setMessageList(prev => [...prev, { ...res, user }])
      })
    }
  }

  const sendText = (text: string) => {
    if (socket !== undefined && !disabled && text != '') {
      socket.sendContent('text', { content: text })
      setMessage('')
    }
  }

  const messageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <>
      <div className="chat">
        <ListGroup variant="flush">
          {messageList.map(msg => (
            <ListGroup.Item key={msg.id}>
              <>
                <sup className="name-color me-2">{msg.user.login}</sup>
                {msg.content}
              </>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="send-message">
        <input
          disabled={disabled}
          type="text"
          onChange={messageHandler}
          value={message}
          placeholder="Напишите сообщение"
          onKeyDown={event => {
            if (event.key === 'Enter') {
              sendText(message)
            }
          }}
        />
        <button type="submit" onClick={() => sendText(message)}>
          <img src={Arrow} alt="Отправить" />
        </button>
      </div>
    </>
  )
}

export default GameChat
