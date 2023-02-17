export const userTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
}

const Actions = {
  setUSer: (data: UserType) => ({
    type: userTypes.SET_USER_DATA,
    payload: data,
  }),
}

export default Actions
