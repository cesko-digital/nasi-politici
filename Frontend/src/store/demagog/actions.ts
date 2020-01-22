import { DemagogState, SET_DEMAGOG_DATA, RESET_DEMAGOG_DATA, DemagogActionTypes } from './types'

export const setDemagogData = (data: DemagogState): DemagogActionTypes => ({
  type: SET_DEMAGOG_DATA,
  payload: {
    ...data,
  },
})

export const resetDemagogData = (): DemagogActionTypes => ({
  type: RESET_DEMAGOG_DATA,
})
