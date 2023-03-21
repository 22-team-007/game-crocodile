// React
import React, { useState } from 'react'
// Components
import { Card, Container, Dropdown } from 'react-bootstrap'
import { ForumComments, ForumThemeContent, MessageForm } from './components'
// Hooks
import useGetForumTheme from '../../hooks/useGetForumTheme'
// SVG
import svgMore from '../../assets/msgToolbar/more.svg'

const ForumTheme = () => {

  const { themeContent, loading } = useGetForumTheme()
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleToggleEditMode = () => setEditMode(!editMode)

  const handleDeleteTheme = () => {
    alert('delete')
  }

  return (
    <Container className='forum-container'>
      <Card>
        <Card.Header>
          <Card.Title className='d-flex align-items-center justify-content-sm-between'>
            {themeContent.subject}
            <Dropdown>
              <Dropdown.Toggle variant='light' id='dropdown-basic'><img src={svgMore} alt='more' /></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleToggleEditMode}>Изменить</Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteTheme}>Удалить</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <ForumThemeContent
            themeContent={themeContent}
            loading={loading}
            editMode={editMode}
          />
          <ForumComments />
          <MessageForm />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ForumTheme
