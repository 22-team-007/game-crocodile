import { UserThemeAction, UserThemeDefAction } from './types'

export enum themeTypes {
  SET_THEME = 'SET_THEME',
  SET_THEME_DEF = 'SET_THEME_DEF',
}

export const setTheme = (name: string): UserThemeAction => ({
  type: themeTypes.SET_THEME,
  payload: name,
})

export const setThemeDef = (): UserThemeDefAction => ({
  type: themeTypes.SET_THEME_DEF,
  payload: '',
})
