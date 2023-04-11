// React
import React, { useCallback, useState } from 'react'
// Components
import { Button, Card, Container, Dropdown } from 'react-bootstrap'
import { ForumComments, ForumThemeContent, MessageForm } from './components'
// Hooks
import useGetForumTheme from '../../hooks/useGetForumTheme'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUser } from '../../store/selectors'
import useGetForumMessages from '../../hooks/useGetForumMessages'
// SVG
import svgMore from '../../assets/msgToolbar/more.svg'

const ForumTheme = () => {

  const { themeContent, loading, update } = useGetForumTheme()
  const { messages, users, createComment, createReaction } = useGetForumMessages()

  const [editMode, setEditMode] = useState<boolean>(false)

  const {control, watch, setValue} = useForm<FormFieldsTheme>()
  const user = useAppSelector(selectUser)

  const handleToggleEditMode = () => setEditMode(!editMode)

  const handleDeleteTheme = () => {
    alert('delete')
  }

  const handleSendComment = () => {
    if (user && themeContent?.theme?.id) {
      createComment({
        subject: '',
        description: watch('description'),
        parent_id: themeContent?.theme?.id,
        author_id: user.id,
      }).then(() => {
        setValue('description', '')
      })
    }
  }

  const handleSendReaction = useCallback((emoji: string, comment_id: number) => {
    if (user) {
      createReaction({
        author_id: user.id,
        comment_id,
        emoji
      })
    }
  }, [])

  return (
    <Container className='forum-container'>
      <Card>
        <Card.Header>
          <Card.Title className='d-flex align-items-center justify-content-sm-between'>
            {themeContent?.theme?.subject}
            {
              user?.id === themeContent?.theme?.author_id &&
              <Dropdown>
                <Dropdown.Toggle variant='light' id='dropdown-basic'><img src={svgMore} alt='more' /></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleToggleEditMode}>Изменить</Dropdown.Item>
                  <Dropdown.Item onClick={handleDeleteTheme}>Удалить</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <ForumThemeContent
            updateTheme={update}
            themeContent={themeContent}
            loading={loading}
            editMode={editMode}
            setEditMode={handleToggleEditMode}
          />
          <ForumComments
            messages={messages}
            users={users}
            handleSendReaction={handleSendReaction}
          />
          <MessageForm
            customRegister={{
              name: 'description',
              control,
              rules: {
                required: true
              }
            }}
          />

          <div className='d-flex justify-content-end'>
            <Button
              variant='primary'
              disabled={!watch('description')}
              onClick={handleSendComment}
            >
              Отправить
            </Button>
          </div>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default ForumTheme