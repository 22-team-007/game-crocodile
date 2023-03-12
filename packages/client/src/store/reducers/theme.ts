import { themeTypes } from '../actions/theme'

import { UserThemeAction } from '../actions/types'

const initState = {
  theme: '',
}

type ThemeState = {
  theme: string
}

export function themeReducer(
  state: ThemeState = initState,
  { type, payload }: UserThemeAction
): ThemeState {
  switch (type) {
    case themeTypes.SET_THEME:
      return {
        ...state,
        theme: payload,
      }
    default:
      return state
  }

  return state
}
