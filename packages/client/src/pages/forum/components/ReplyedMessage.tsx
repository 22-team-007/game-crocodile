import { FC } from 'react'
import { MarkDown } from './index'
import { Accordion, Button } from 'react-bootstrap'

interface IReplyedMessageProps {
  replyedMessage: CommentRecord | null
  setReplyMessage: (replyMessage: CommentRecord | null) => void;
}

const ReplyedMessage: FC<IReplyedMessageProps> = ({
  replyedMessage,
  setReplyMessage
                                                  }) => {
  return (
    replyedMessage &&
    <div className="replyed-message mt-3">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex justify-content-between w-100 align-items-center">
              <span>Ответ на сообщение пользователя: {replyedMessage.login}</span>
              <span
                className="mx-2"
                onClick={() => setReplyMessage(null)}
              >✖</span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <MarkDown text={replyedMessage.description}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default ReplyedMessage
