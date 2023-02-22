import { userTypes } from '../actions/user'

const initState = {
  user: null,
}

type UserState = {
  user: UserType | null
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

    default:
      return state
  }
}
