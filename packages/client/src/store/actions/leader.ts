import { SetLeaderAction } from './types'

export enum leaderTypes {
  SET_LEADER = 'SET_LEADER',
}

export const SetLeader = (id: number): SetLeaderAction => ({
  type: leaderTypes.SET_LEADER,
  payload: id,
})


