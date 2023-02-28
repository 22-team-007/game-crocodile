// import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import api from '../../api'
import type {} from 'redux-thunk/extend-redux'
import { RootState } from '../store'
import { UserAvatarAction, UserDataAction, UserProfileAction } from './types'

export enum userTypes {
  SET_USER_DATA = 'SET_USER_DATA',
  SET_USER_AVATAR = 'SET_USER_AVATAR',
  SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export const setUser = (data: SignInParams): ThunkAction<Promise<void>, RootState, void, UserDataAction> =>
  async (dispatch: ThunkDispatch<RootState, void, UserDataAction>) => {
    try {
      const user = await api.auth.signIn(data)
      dispatch({
        type: userTypes.SET_USER_DATA,
        payload: user
      })
    } catch (err) {
      console.error(err)
    }
  }

export const setAvatar = (src: string): UserAvatarAction => ({
  type: userTypes.SET_USER_AVATAR,
  payload: src
})

export const setProfile = (data: ProfileParams): UserProfileAction => ({
  type: userTypes.SET_USER_PROFILE,
  payload: data
})
