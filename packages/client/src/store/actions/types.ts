import { userTypes } from './user'
import { themeTypes } from './theme'
import { leaderTypes } from './leader'

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

export type UserThemeDefAction = {
  type: themeTypes.SET_THEME_DEF
  payload: string
}

export type SetLeaderAction = {
  type: leaderTypes.SET_LEADER
  payload: number
}

export type UserAction =
  | UserDataAction
  | UserProfileAction
  | UserAvatarAction
  | UserLogoutAction

  export type ThemeAction = UserThemeAction | UserThemeDefAction
