import { combineReducers } from 'redux'
import { userReducer } from './user'
import { themeReducer } from './theme'
import type { UserState } from './user'
import type { ThemeState } from './theme'

export type IRootState = {
  userData: UserState
  theme: ThemeState
}

export default combineReducers({
  userData: userReducer,
  theme: themeReducer,
})
