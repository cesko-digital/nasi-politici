import { DemagogState, SET_DEMAGOG_DATA } from "./types";

export const setDemagogData = (data: DemagogState) => ({
  type: SET_DEMAGOG_DATA,
  payload: {
		...data,
	}
});
