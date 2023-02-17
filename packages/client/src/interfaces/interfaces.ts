export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: UserType
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

export interface LeaderProps extends UserType {
  score: number
}

export type TopUser = Required<LeaderProps>

export interface TopLeaderProp extends TopUser {
  title: string
}
