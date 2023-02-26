import { userTypes } from '../actions/user'

const initState = {
  user: null,
}

type UserState = {
  user: UserType | null,
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
    case userTypes.SET_USER_PROFILE:
      return {
        ...state,
        user: payload,
      }
    case userTypes.SET_USER_AVATAR:
      if(state.user) {
        return {
          ...state,
          user: {...state.user, avatar: payload},
        }
      }

    default:
      return state
  }
}
