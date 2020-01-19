import { DemagogState, SET_DEMAGOG_DATA, RESET_DEMAGOG_DATA } from "./types";

export const setDemagogData = (data: DemagogState) => ({
  type: SET_DEMAGOG_DATA,
  payload: {
		...data,
	}
});

export const resetDemagogData = () => ({
  type: RESET_DEMAGOG_DATA,
})
