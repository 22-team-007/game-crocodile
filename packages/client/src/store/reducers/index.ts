import { combineReducers } from 'redux'
import { userReducer } from './user'
import { themeReducer } from './theme'

export default combineReducers({
  userData: userReducer,
  theme: themeReducer
})
