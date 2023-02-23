import { Dispatch } from 'redux'
import api from '../../api'

export const userTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_USER_AVATAR: 'SET_USER_AVATAR',
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
