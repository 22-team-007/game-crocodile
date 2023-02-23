import { userTypes } from '../actions/user'

const initState = {
  user: null,
  userAvatar: undefined
}

type UserState = {
  user: UserType | null,
  userAvatar: string | undefined
}

export function userReducer(
  state: UserState = initState,
  { type, payload }: ItemActionType
): UserState {
  switch (type) {
    case userTypes.SET_USER_DATA:
      return {
        ...state,
        user: payload,
      }
    case userTypes.SET_USER_AVATAR:
      return {
        ...state,
        userAvatar: payload.avatar,
      }

    default:
      return state
  }
}
