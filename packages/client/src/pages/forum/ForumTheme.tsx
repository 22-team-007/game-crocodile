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
import { useNavigate } from 'react-router-dom'
// SVG
import svgMore from '../../assets/msgToolbar/more.svg'
import ReplyedMessage from './components/ReplyedMessage'

const ForumTheme = () => {

  const { themeContent, loading, update, deleteTheme } = useGetForumTheme()
  const { messages, users, createComment, createReaction } = useGetForumMessages()

  const navigate = useNavigate()

  const [replyMessage, setReplyMessage] = useState<CommentRecord | null>(null)

  const [editMode, setEditMode] = useState<boolean>(false)

  const {control, watch, setValue} = useForm<FormFieldsTheme>()
  const user = useAppSelector(selectUser)

  const handleToggleEditMode = () => setEditMode(!editMode)

  const handleDeleteTheme = () => {
    if (themeContent?.theme?.id) {
      deleteTheme(themeContent?.theme?.id)
        .then(() => navigate('/forum'))
        .catch((err) => console.log(err.message))
    }
  }

  const handleSendComment = () => {
    if (user && themeContent?.theme?.id) {
      createComment({
        subject: '',
        description: watch('description'),
        parent_id: themeContent?.theme?.id,
        author_id: user.id,
        replyed_id: replyMessage?.id
      }).then(() => {
        setValue('description', '')
        setReplyMessage(null)
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
            setReplyMessage={setReplyMessage}
          />
          <ReplyedMessage
            replyedMessage={replyMessage}
            setReplyMessage={setReplyMessage}
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
