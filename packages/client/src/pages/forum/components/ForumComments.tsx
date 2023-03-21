// React
import { memo } from 'react'
// Components
import { ListGroup, Image } from 'react-bootstrap'
import { MarkDown } from './index'
// Hooks
import useGetForumMessages from '../../../hooks/useGetForumMessages'
// Api
import api from '../../../api'

const ForumComments = () => {

  const { messages, users, loading } = useGetForumMessages()

  return (
    <ListGroup className='theme-messages'>
      <h5 className='mt-3'>Комментарии: </h5>
      {
        !loading && messages?.map((message, index) =>
          <ListGroup.Item key={`message-${message.id}`} className='d-flex justify-content-between'>
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
              <div className='message-text'>
                <div className='message-number'>#{index + 1}</div>
                <MarkDown text={message.description} />
              </div>
            </div>
            <div className='right'>
              <small>5 минут назад</small>
            </div>
          </ListGroup.Item>
        )
      }
    </ListGroup>
  )
}
export default memo(ForumComments)
