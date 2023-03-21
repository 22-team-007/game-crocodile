// React
import { FC } from 'react'
// Components
import { Image, ListGroup } from 'react-bootstrap'
import { MarkDown, MessageForm } from './index'
// Api
import api from '../../../api'

interface ForumThemeContentProps {
  themeContent: any
  loading: boolean
  editMode: boolean
}

const ForumThemeContent: FC<ForumThemeContentProps> = ({ themeContent, loading, editMode }) => {
  return (
    <ListGroup className='theme-messages'>
      {
        !loading &&
        <ListGroup.Item className='d-flex justify-content-between'>
          <div className='d-flex left w-100'>
            <div className='d-flex flex-column align-items-center'>
              <Image
                width={50}
                height={50}
                rounded={true}
                src={api.resources.url(themeContent?.avatar)}
                alt='user-avatar'
              />
              <div>{themeContent?.login}</div>
            </div>
            <div className='message-text w-100'>
              {
                !editMode ?
                  <>
                    <div className='message-number'></div>
                    <MarkDown text={themeContent.description} />
                  </>
                  :
                  <MessageForm editMode={editMode} defaultValue={themeContent.description} />
              }
            </div>
          </div>
          <div className='right'>
            <small>5 минут назад</small>
          </div>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

export default ForumThemeContent
