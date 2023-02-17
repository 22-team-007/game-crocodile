declare type Field = {
  label: string
  type: string
  name: string
  value?: string
  message?: string
  errMessage?: string
  regExp?: RegExp
}
declare type SignInParams = {
  [k: string]
  login: string
  password: string
}
declare type SignUpParams = SignInParams & {
  first_name: string
  second_name: string
  email: string
  phone: string
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
declare type ItemActionType = {
  payload: UserType
  type: string
}
