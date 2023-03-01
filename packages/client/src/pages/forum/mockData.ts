export const mockMessages: Message[] = [
  {
    chat_id: 0,
    time: '01',
    type: 'type',
    user_id: 1,
    content: 'qqwewqe',
  },
]
export const mockUser: UserType = {
  id: 0,
  first_name: 'alexey',
  second_name: 'second',
  display_name: 'test',
  login: 'login',
  email: 'email',
  phone: '12132',
  avatar: 'avatar',
}
export const mockTopics: GameType[] = [
  {
    id: 1,
    created_by: 1,
    title: 'test',
    avatar: 'src',
    unread_count: 0,
    last_message: {
      user: mockUser,
      time: '123',
      content: '1212212',
    },
  },
]
