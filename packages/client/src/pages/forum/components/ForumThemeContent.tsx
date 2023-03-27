// React
import React, { FC } from 'react'
// Components
import { Button, Image, ListGroup } from 'react-bootstrap'
import { MarkDown, MessageForm } from './index'
// Api
import api from '../../../api'
import { useForm } from 'react-hook-form'
import { getFormatDateString } from '../../../utils/getFormatDateString'

interface ForumThemeContentProps {
  themeContent: any
  loading: boolean
  editMode: boolean
  setEditMode: () => void
  updateTheme: (data: ForumRecord) => void;
}

const ForumThemeContent: FC<ForumThemeContentProps> = ({ themeContent, loading, editMode, setEditMode, updateTheme }) => {

  const {control, watch} = useForm<FormFieldsTheme>()

  const handleUpdateTheme = () => {
    updateTheme({
      ...themeContent.theme, description: watch('description')
    })
    setEditMode()
  }

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
                src={api.resources.url(themeContent?.user?.avatar)}
                alt='user-avatar'
              />
              <div>{themeContent?.user?.login}</div>
            </div>
            <div className='message-text w-100'>
              {
                !editMode ?
                  <>
                    <div className='message-number'></div>
                    <MarkDown text={themeContent?.theme?.description} />
                  </>
                  :
                  <>
                    <MessageForm
                      mode={'edit'}
                      customRegister={{
                        name: 'description',
                        defaultValue: themeContent?.theme?.description,
                        control
                      }}
                    />
                    <div className='d-flex justify-content-end'>
                      <Button
                        variant='primary'
                        onClick={setEditMode}
                        className='mx-2'
                      >
                        Отмена
                      </Button>
                      <Button
                        variant='primary'
                        disabled={!watch('description')}
                        onClick={handleUpdateTheme}
                      >
                        Применить
                      </Button>
                    </div>
                  </>
              }
            </div>

          </div>
          <div className='right'>
            <small>{getFormatDateString(themeContent?.theme?.updatedAt)}</small>
          </div>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

export default ForumThemeContent
