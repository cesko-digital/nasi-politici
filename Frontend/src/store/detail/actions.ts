import {
	Detail,
	SET_DETAIL,
	SET_LOADING_DETAIL_END,
	SET_LOADING_DETAIL_START,
	TOGGLE_SHOW_ALL_DONATIONS,
	TOGGLE_SHOW_ALL_ROLES,
	LOAD_DETAIL,
} from "./types";

export const setDetail = (detail: Detail) => ({
	type: SET_DETAIL,
	payload: detail,
});

export const loadingDetailStarted = () => ({
	type: SET_LOADING_DETAIL_START,
});

export const loadingDetailEnded = () => ({
	type: SET_LOADING_DETAIL_END,
});

export const toggleShowAllDonations = () => ({
  type: TOGGLE_SHOW_ALL_DONATIONS,
});

export const toggleShowAllRoles = () => ({
  type: TOGGLE_SHOW_ALL_ROLES,
});

export const loadDetail = (id: string) => ({
	type: LOAD_DETAIL,
	payload: id,
});
