import { AnyAction } from 'redux'
import { userTypes } from '../actions/user'

const initState = {
  user: null,
  userAvatar: undefined
}

type UserState = {
  user: UserType | null,
  userAvatar: string | undefined
}


type TAction = {
  [k: string]: any
}

export function userReducer(
  state: UserState = initState,
  { type, payload }: TAction
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
        userAvatar: payload,
      }

    default:
      return state
  }
}
