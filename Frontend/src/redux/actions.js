import {
	SET_SEARCH_QUERY,
  SEARCH,
  SET_SEARCH_START,
  SET_SEARCH_END,
	SET_SEARCH_RESULTS,
	LOAD_DETAIL,
	SET_DETAIL,
	SET_LOADING_DETAIL_END,
  SET_LOADING_DETAIL_START,
  SET_DETAIL_NEWS,
  TOGGLE_SHOW_ALL_DONATIONS,
	TOGGLE_SHOW_ALL_ROLES,
	SET_REPORT_MODAL_OPEN,
	SUBMIT_REPORT_MODAL,
	SET_DEMAGOG_DATA,
} from "./action-types";

export const setSearchQuery = query => ({
  type: SET_SEARCH_QUERY,
  payload: {
    query
  }
});

export const setSearchResults = results => ({
  type: SET_SEARCH_RESULTS,
  payload: {
    results
  }
});

export const search = () => ({
  type: SEARCH,
});

export const loadDetail = id => ({
	type: LOAD_DETAIL,
	payload: {
		id,
	},
});

export const setDetail = detail => ({
	type: SET_DETAIL,
	payload: {
		detail,
	},
});

export const loadingDetailStarted = () => ({
	type: SET_LOADING_DETAIL_START,
});

export const loadingDetailEnded = () => ({
	type: SET_LOADING_DETAIL_END,
});

export const searchStarted = () => ({
	type: SET_SEARCH_START,
});

export const searchEnded = () => ({
	type: SET_SEARCH_END,
});

export const setDetailNews = news => ({
  type: SET_DETAIL_NEWS,
  payload: {
    news
  }
});

export const setDemagogData = data => ({
  type: SET_DEMAGOG_DATA,
  payload: data
});

export const toggleShowAllDonations = () => ({
  type: TOGGLE_SHOW_ALL_DONATIONS,
});

export const toggleShowAllRoles = () => ({
  type: TOGGLE_SHOW_ALL_ROLES,
});

export const openReportModal = (modalTitle) => ({
	type: SET_REPORT_MODAL_OPEN,
	payload: {
		open: true,
		modalTitle,
	},
});

export const closeReportModal = () => ({
	type: SET_REPORT_MODAL_OPEN,
	payload: {
		open: false,
		modalTitle: '',
	},
});

export const submitReportModal = ({description, email, title}) => ({
	type: SUBMIT_REPORT_MODAL,
	payload: {
		description,
		email,
		title,
	},
});
