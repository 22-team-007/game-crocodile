import { themeTypes } from '../actions/theme'

import { UserThemeAction } from '../actions/types'

const initState = {
  name: '',
}

type ThemeState = {
  name: string
}

export function themeReducer(
  state: ThemeState = initState,
  { type, payload }: UserThemeAction
): ThemeState {
  switch (type) {
    case themeTypes.SET_THEME:
      return {
        ...state,
        name: payload,
      }
    default:
      return state
  }

  return state
}
