import { FC, memo } from 'react'
import { ListGroup, Image } from 'react-bootstrap'

import { ForumMessagesProps } from '../../interfaces/interfaces'

const ForumMessages: FC<ForumMessagesProps> = () => {
  return (
    <ListGroup className="theme-messages">
      <ListGroup.Item className="d-flex justify-content-between">
        <div className="d-flex left">
          <div className="d-flex flex-column align-items-center">
            <div>user1</div>
            <Image
              width={50}
              height={50}
              rounded={true}
              src="https://place-hold.it/50x50/f5f5f5/"
              alt="user-avatar"
            />
          </div>
          <div className="message-text">
            <div className="message-number">#1</div>
            Выход игры уже рядом, время обсуждать. На чем будете играть, кем
            будете играть? Выход игры уже рядом, время обсуждать. На чем будете
            играть, кем будете играть?
          </div>
        </div>
        <div className="right">
          <small>5 минут назад</small>
        </div>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex justify-content-between">
        <div className="d-flex left">
          <div className="d-flex flex-column align-items-center">
            <div>user2</div>
            <Image
              width={50}
              height={50}
              rounded={true}
              src="https://place-hold.it/50x50/f5f5f5/"
              alt="user-avatar"
            />
          </div>
          <div className="message-text">
            <div className="message-number">#2</div>
            Выход игры уже рядом, время обсуждать.
          </div>
        </div>
        <div className="right">
          <small>11 минут назад</small>
        </div>
      </ListGroup.Item>
    </ListGroup>
  )
}
export default memo(ForumMessages)
