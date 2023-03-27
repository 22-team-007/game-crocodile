// React
import React, { FC, memo, useState } from 'react'
// Components
import { ListGroup, Image, Dropdown } from 'react-bootstrap'
import { MarkDown } from './index'
// Hooks
import useGetForumMessages from '../../../hooks/useGetForumMessages'
// Api
import api from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'

interface ForumCommentsProps {
  messages: ForumRecord[]
  users: any
}

const ForumComments: FC<ForumCommentsProps> = ({messages, users}) => {
  return (
    <ListGroup className='theme-messages'>
      <h5 className='mt-3'>Комментарии: </h5>
      {
        messages?.map((message, index) =>
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
                  <small className='px-1 reaction'>ответить</small>
                  <small>5 минут назад</small>
                </div>
              </div>
              <div className='emoji'>

                <Dropdown>
                  <Dropdown.Toggle as={'span'}>
                    <FontAwesomeIcon icon={faFaceSmile} size={'lg'}/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='emoji_dropdown'>
                    <Dropdown.Item>😀</Dropdown.Item>
                    <Dropdown.Item>😧</Dropdown.Item>
                    <Dropdown.Item active>🧡</Dropdown.Item>
                    <Dropdown.Item>👍</Dropdown.Item>
                    <Dropdown.Item>👎</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <span className='emoji-item'>😀 1</span>
                <span className='emoji-item'>😧 1</span>
                <span className='emoji-item active'>🧡 1</span>
                <span className='emoji-item'>👍 1</span>
                <span className='emoji-item'>👎 1</span>
              </div>
            </div>
          </ListGroup.Item>
        )
      }
    </ListGroup>
  )
}
export default memo(ForumComments)
