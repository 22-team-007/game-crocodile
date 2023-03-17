import { memo } from 'react'
import { ListGroup, Image } from 'react-bootstrap'
import MarkDown from './MarkDown'
import useGetForumMessages from '../../../hooks/useGetForumMessages'

// todo раскоментировать как будет готов бэк
// declare interface Message {
//   chat_id: number
//   time: string
//   type: string
//   user_id: number
//   content: string
//   file?: ResourceType
// }

const ForumMessages = () => {

  const { messages } = useGetForumMessages();

  return (
    <ListGroup className="theme-messages">
      {
        messages.map((message, index) =>
          <ListGroup.Item className="d-flex justify-content-between">
            <div className="d-flex left">
              <div className="d-flex flex-column align-items-center">
                <Image
                  width={50}
                  height={50}
                  rounded={true}
                  src="https://place-hold.it/50x50/f5f5f5/"
                  alt="user-avatar"
                />
                <div>user1 {message.author_id}</div>
              </div>
              <div className="message-text">
                <div className="message-number">#{index + 1}</div>
                <MarkDown text={message.description}/>
              </div>
            </div>
            <div className="right">
              <small>5 минут назад</small>
            </div>
          </ListGroup.Item>
        )
      }
    </ListGroup>
  )
}
export default memo(ForumMessages)
