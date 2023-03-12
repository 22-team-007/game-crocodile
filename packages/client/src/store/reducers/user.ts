import { userTypes } from '../actions/user'

import { UserAction } from '../actions/types'

const initState = {
  user: null,
}

type UserState = {
  user: UserType | null
}

export function userReducer(
  state: UserState = initState,
  { type, payload }: UserAction
): UserState {
  switch (type) {
    case userTypes.SET_USER_DATA:
      return {
        ...state,
        user: payload,
      }
    case userTypes.REMOVE_USER_DATA:
      return {
        ...state,
        user: null,
      }
    case userTypes.SET_USER_PROFILE:
      return {
        ...state,
        user: state.user ? { ...state.user, ...payload } : null,
      }
    case userTypes.SET_USER_AVATAR:
      if (state.user) {
        return {
          ...state,
          user: { ...state.user, avatar: payload },
        }
      }
      break

    default:
      return state
  }

  return state
}
