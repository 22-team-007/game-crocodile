// React
import React, { FC, memo } from 'react'
// Components
import { ListGroup, Image, Dropdown } from 'react-bootstrap'
import { MarkDown } from './index'
// Api
import api from '../../../api'
import { getFormatDateString } from '../../../utils/getFormatDateString'

interface ForumCommentsProps {
  messages: CommentRecord[]
  users: UsersType | null
  handleSendReaction: (emoji: string, comment_id: number) => void
}

const ForumComments: FC<ForumCommentsProps> = ({messages, users, handleSendReaction}) => {

  const emojis = [
    '🧡',
    '😀',
    '😧',
    '👍',
    '👎',
  ]

  return (
    <ListGroup className='theme-messages'>
      <h5 className='mt-3'>Комментарии: </h5>
      {
        users && messages?.map((message, index) =>
          <ListGroup.Item key={`message-${message.id}`} className='d-flex message'>
            <div className='d-flex left'>
              <div className='d-flex flex-column align-items-center'>
                <Image
                  width={50}
                  height={50}
                  rounded={true}
                  src={api.resources.url(users[message.author_id]?.avatar)}
                  alt='user-avatar'
                />
                <div>{users[message.author_id]?.login}</div>
              </div>
            </div>

            <div className='d-flex flex-column w-100 text-content'>
              <div className='d-flex justify-content-between w-100'>
                <div className='message-text'>
                  <div className='message-number'>#{index + 1}</div>
                  <MarkDown text={message.description} />
                </div>
                <div className='right'>
                  {/* <small className='px-1 reaction'>ответить</small> */}
                  <small>{getFormatDateString(message.updatedAt)}</small>
                </div>
              </div>
              <div className='emoji'>

                <Dropdown>
                  <Dropdown.Toggle as={'span'}>
                  🧡
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='emoji_dropdown'>
                    {
                      emojis.map(emoji =>
                        <Dropdown.Item key={emoji} onClick={() => handleSendReaction(emoji, message.id)}>{emoji}</Dropdown.Item>
                      )
                    }
                  </Dropdown.Menu>
                </Dropdown>
                {
                  message.emojis && Object.entries(message.emojis).map(emoji =>
                    <span key={`emoji-${emoji[0]}`} className='emoji-item'>{emoji[0]} {emoji[1]}</span>
                  )
                }
              </div>
            </div>
          </ListGroup.Item>
        )
      }
    </ListGroup>
  )
}
export default memo(ForumComments)
