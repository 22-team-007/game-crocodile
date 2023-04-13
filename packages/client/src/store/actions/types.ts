import { userTypes } from './user'
import { themeTypes } from './theme'

export type UserDataAction = {
  type: userTypes.SET_USER_DATA
  payload: UserType
}

export type UserLogoutAction = {
  type: userTypes.REMOVE_USER_DATA
  payload: null
}

export type UserProfileAction = {
  type: userTypes.SET_USER_PROFILE
  payload: ProfileParams
}

export type UserAvatarAction = {
  type: userTypes.SET_USER_AVATAR
  payload: string
}

export type UserThemeAction = {
  type: themeTypes.SET_THEME
  payload: string
}

export type UserAction =
  | UserDataAction
  | UserProfileAction
  | UserAvatarAction
  | UserLogoutAction
