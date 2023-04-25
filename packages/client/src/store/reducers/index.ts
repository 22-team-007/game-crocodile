import { combineReducers } from 'redux'
import { userReducer } from './user'
import { leaderReducer } from './leader'
import { themeReducer } from './theme'
import type { UserState } from './user'
import type { ThemeState } from './theme'
import type { LeaderState } from './leader'

export type IRootState = {
  userData: UserState
  theme: ThemeState
  leader: LeaderState
}

export default combineReducers({
  userData: userReducer,
  theme: themeReducer,
  leader: leaderReducer
})
