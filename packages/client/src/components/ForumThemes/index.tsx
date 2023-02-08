import { FC, memo } from 'react'
import { ListGroup, Image } from 'react-bootstrap'

import { ForumThemesProps } from '../../interfaces/interfaces'

const ForumMessages: FC<ForumThemesProps> = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Последние темы</h5>
        <span>Ответы</span>
      </div>

      <ListGroup as="nav" className="forum-themes">
        <ListGroup.Item
          as="li"
          className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center left">
            <Image
              width={30}
              height={30}
              rounded={true}
              src="https://place-hold.it/30x30/000"
              alt="theme-image"
            />
            <div className="d-flex flex-column">
              <span>Обсуждение темы 1</span>
              <div>
                user1 <small>(5 минут назад)</small>
              </div>
            </div>
          </div>
          <div className="right">
            <b>3</b>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center left">
            <Image
              width={30}
              height={30}
              rounded={true}
              src="https://place-hold.it/30x30/000"
              alt="theme-image"
            />
            <div className="d-flex flex-column">
              <span>Обсуждение темы 2</span>
              <div>
                user2 <small>(15 минут назад)</small>
              </div>
            </div>
          </div>
          <div className="right">
            <b>1</b>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
export default memo(ForumMessages)
