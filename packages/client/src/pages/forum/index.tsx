import ForumMessages from '../../components/ForumMessages'
import ForumThemes from '../../components/ForumThemes'
import { Container } from 'react-bootstrap'

import { mockTopics, mockMessages } from './mockData'
import './styles.scss'

const Forum = () => {
  return (
    <Container className="forum-container">

      <ForumThemes chats={mockTopics} />

      <br />

      <ForumMessages messages={mockMessages} selectedChat={1} userId={1} />
      
    </Container>
  )
}
export default Forum
