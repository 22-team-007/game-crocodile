declare type SignInParams = {
  [k: string]
  login: string
  password: string
}

declare interface LoginData extends SignInParams {
  password: string
}

declare type SignUpParams = SignInParams & {
  first_name: string
  second_name: string
  email: string
  phone: string
}

declare interface RegistrationData extends SignUpParams {
  password_repeat: string
}

declare type UserType = Omit<SignUpParams, 'password'> & {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar?: string
}

declare type ProfileParams = Omit<UserType, 'id'>

declare type PasswordParams = {
  [k: string]
  oldPassword: string
  newPassword: string
  repeatPassword?: string
}

declare type ResourceType = {
  id: number
  user_id: number
  path: string
  filename: string
  content_type: string
  content_size: number
  upload_date: string
}

declare type GameType = {
  id: number
  created_by: number
  title: string
  avatar: string
  unread_count?: number
  last_message?: {
    user: UserType
    time: string
    content: string
  }
}

declare type LeaderType = {
  id: number
  score: number
}

declare interface Message {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: ResourceType
}

declare interface ForumMessagesProps {
  selectedChat: number | undefined
  messages: Message[]
  userId: number
}

declare interface ForumThemesProps {
  chats: GameType[]
}

declare interface LeaderProps extends UserType {
  score: number
}

declare type TopUser = Required<LeaderProps>

declare interface TopLeaderProp extends TopUser {
  title: string
}

declare type Coordinate = [x: number, y: number]

declare interface SocketAPIType extends WebSocket {
  sendContent: (type: string, content: Omit<SocketContent, 'type'>) => void
  sendImage: (content: string) => void
  getMessages: (content: string) => void
  on<T>(event: string, handler: (res: T) => void): void
}

declare type SocketContent = {
  type: string
  chat_id?: number
  time?: string
  user_id?: number
  id?: number
  color?: string
  content?: string | Coordinate[] | SocketContent
  file?: ResourceType
}

declare type SocketMessage = SocketContent & {
  user: UserType
}
