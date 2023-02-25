import { AnyAction, Dispatch } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import api from '../../api'
import { RootState } from '../store'

import 'redux-thunk/extend-redux'

export const userTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_USER_AVATAR: 'SET_USER_AVATAR',
}

export const setUser = 
(data: SignInParams): ThunkAction<Promise<void>, {}, {}, AnyAction> => 
async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    const user = await api.auth.signIn(data)
    dispatch({
      type: userTypes.SET_USER_DATA,
      payload: user,
    })
  } catch (err) {
    console.error(err)
  }
}


const Actions = {
  setUser: (data: SignInParams) => {
    return async (dispatch: Dispatch) => {
      try {
        api.auth.signIn(data).then(user => {
          dispatch({
            type: userTypes.SET_USER_DATA,
            payload: user,
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
  },
  setAvatar: (src: string) => ({
    type: userTypes.SET_USER_AVATAR,
    payload: src,
  }),
}

export default Actions
