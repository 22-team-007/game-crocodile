export interface GetUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: GetUser
    time: string
    content: string
  }
}

export interface Message {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

export interface ForumMessagesProps {
  selectedChat: number | undefined
  messages: Message[]
  userId: number
}

export interface ForumThemesProps {
  chats: ChatInfo[]
}