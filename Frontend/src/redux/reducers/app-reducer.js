import * as actions from "../action-types";

const initialState = {
	searchQuery: '',
	searchResults: null,
	detail: {},
	detailNews: [],
	loadingDetail: false,
  loadingSearch: false,
  showAllDonations: false,
	showAllRoles: false,
	showReporModal: false,
	reportModalTitle: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCH_QUERY: {
			const { query } = action.payload;
      return {
        ...state,
        searchQuery: query,
      };
    }
    case actions.SET_SEARCH_RESULTS: {
			const { results } = action.payload;
      return {
        ...state,
        searchResults: results,
      };
    }
    case actions.SET_DETAIL: {
			const { detail } = action.payload;
      return {
        ...state,
        detail,
      };
    }
    case actions.SET_LOADING_DETAIL_START: {
      return {
        ...state,
        loadingDetail: true,
      };
    }
    case actions.SET_LOADING_DETAIL_END: {
      return {
        ...state,
        loadingDetail: false,
      };
    }
    case actions.SET_SEARCH_START: {
      return {
        ...state,
        loadingSearch: true,
      };
    }
    case actions.SET_SEARCH_END: {
      return {
        ...state,
        loadingSearch: false,
      };
    }
    case actions.SET_DETAIL_NEWS: {
			const { news } = action.payload;
      return {
        ...state,
        detailNews: news,
      };
    }
    case actions.TOGGLE_SHOW_ALL_DONATIONS: {
      return {
        ...state,
        showAllDonations: !state.showAllDonations,
      };
    }
    case actions.TOGGLE_SHOW_ALL_ROLES: {
      return {
        ...state,
        showAllRoles: !state.showAllRoles,
      };
    }
    case actions.SET_REPORT_MODAL_OPEN: {
      return {
        ...state,
        showReporModal: action.payload.open,
        reportModalTitle: action.payload.modalTitle,
      };
    }
    default:
      return state;
  }
}
