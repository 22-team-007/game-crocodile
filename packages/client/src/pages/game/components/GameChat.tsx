import { ChangeEvent, FC, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'

import api from '../../../api'
import { sound } from '../../../utils/sound'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectLeader, selectUserId } from '../../../store/selectors'
import { useAppDispatch } from '../../../hooks/useAppSelector'
import { SetLeader } from '../../../store/actions/leader'

import Arrow from '../../../assets/arrow.svg'


interface GameChatProps {
  chatId: number
  socket?: SocketAPIType
  disabled: boolean
}

const GameChat: FC<GameChatProps> = ({ socket, disabled }) => {
  const [messageList, setMessageList] = useState<SocketMessage[]>([])
  const [message, setMessage] = useState('')
  const userId = useAppSelector(selectUserId)
  const leaderId = useAppSelector(selectLeader)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (socket !== undefined) {
      socket.on<SocketContent>('text', onText)
      socket.on<SocketContent>('user connected', onUserConnected)
      socket.on<SocketContent>('sys msg', onSysMsg)
    }
  }, [socket])

  const onText = (res: SocketContent) => {
    if (res.user_id !== undefined) {
      api.users.get(res.user_id).then((user: UserType) => {
        setMessageList(prev => [...prev, { ...res, user }])
      })
    }
  }

  const onSysMsg = (res: SocketContent) => {
    if (res.user_id === undefined) return 
    // debugger

    if(res.content === 'leader' && res.user_id !== userId){
      // set leader
      dispatch(SetLeader(res.user_id))
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

  const onUserConnected = async (res: SocketContent) => {
    if(res.content === undefined) return
    // debugger

    if(leaderId === userId){
      socket?.sendContent('sys msg', {content: 'leader'})
    }

    api.users.get(Number(res.content)).then((user: UserType) => {
      res.content = 'вошёл в комнату'
        setMessageList(prev => [...prev, { ...res, user }])
        sound.play('userEnter')
      })
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
