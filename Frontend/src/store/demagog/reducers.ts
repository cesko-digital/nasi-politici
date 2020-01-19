import { SET_DEMAGOG_DATA, RESET_DEMAGOG_DATA, DemagogState, DemagogActionTypes } from "./types";

const initialState: DemagogState = {
	id: '',
	misleading: 0,
	true: 0,
	untrue: 0,
	unverifiable: 0,
};

export function demagogReducer(
  state = initialState,
  action: DemagogActionTypes
): DemagogState {
  switch (action.type) {
    case SET_DEMAGOG_DATA: {
      return {
        ...action.payload,
      };
    }
    case RESET_DEMAGOG_DATA: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
