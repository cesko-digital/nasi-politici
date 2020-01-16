export interface DemagogState {
	id: string,
	misleading: number,
	true: number,
	untrue: number,
	unverifiable: number,
}

export const SET_DEMAGOG_DATA = 'SET_DEMAGOG_DATA'

interface SetDemagogDataAction {
  type: typeof SET_DEMAGOG_DATA;
  payload: DemagogState;
}

export type DemagogActionTypes = SetDemagogDataAction;
