
import { leaderTypes } from '../actions/leader'
import { SetLeaderAction } from '../actions/types'

const initState = 0

export type LeaderState = number 

export function leaderReducer(
  state: LeaderState = initState,
  { type, payload }: SetLeaderAction
): LeaderState {
  switch (type) {
    case leaderTypes.SET_LEADER:
      return Number(payload)
  }
  return state
}
