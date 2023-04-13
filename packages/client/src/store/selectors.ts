import { createSelector } from 'reselect'
import { RootState } from './store'

const getTheme = (state: RootState) => state.theme.name
const getUser = (state: RootState) => state.userData.user
const getAvatar = (state: RootState) => state.userData.user?.avatar

export const selectUser = createSelector(getUser, user => user)

export const selectUserId = createSelector(getUser, user => user?.id)

export const selectUserAvatar = createSelector(getAvatar, avatar => avatar)

export const selectTheme = createSelector(getTheme, theme => theme)
