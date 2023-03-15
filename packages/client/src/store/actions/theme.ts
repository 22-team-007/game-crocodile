import { UserThemeAction } from "./types";

export enum themeTypes {
  SET_THEME = 'SET_THEME',
}

export const setTheme = (name: string): UserThemeAction => ({
  type: themeTypes.SET_THEME,
  payload: name,
})
