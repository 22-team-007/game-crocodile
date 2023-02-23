export const userTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_USER_AVATAR: 'SET_USER_AVATAR',
}

const Actions = {
  setUSer: (data: UserType) => ({
    type: userTypes.SET_USER_DATA,
    payload: data,
  }),
  setAvatar: (src: string) => ({
    type: userTypes.SET_USER_AVATAR,
    payload: src,
  }),
}

export default Actions
