import { themeTypes } from '../actions/theme'
import { ThemeAction } from '../actions/types'

const initState = {
  name: 'white-theme',
  defTheme: 'white-theme',
}

export type ThemeState = {
  name: string
  defTheme: string
}

export function themeReducer(
  state: ThemeState = initState,
  { type, payload }: ThemeAction
): ThemeState {
  switch (type) {
    case themeTypes.SET_THEME:
      return {
        ...state,
        name: payload,
      }
      
    case themeTypes.SET_THEME_DEF:
      return {
        ...state,
        name: state.defTheme,
      }      
    // default:
    //   return state
  }

  return state
}
