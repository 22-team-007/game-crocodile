import { createSelector } from 'reselect'
import { RootState } from './store'


const getUser = (state: RootState) => state.userData.user
const getAvatar = (state: RootState) => state.userData.userAvatar

export const selectUser = createSelector(getUser, user => user);

export const selectUserAvatar = createSelector(getAvatar, avatar => avatar);
