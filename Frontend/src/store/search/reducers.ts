import {
  RESET_FILTERS,
  RESET_SEARCH_QUERY,
  SearchActionTypes,
  SearchState,
  SET_FILTER,
  SET_FILTERS,
  SET_PROFILES_COUNT,
  SET_SEARCH_LOADING,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
} from './types'

const initialState: SearchState = {
  query: '',
  results: [],
  wasSearched: false,
  profilesCount: 0,
  isLoading: false,
  filters: {},
}

export function searchReducer(state = initialState, action: SearchActionTypes): SearchState {
  switch (action.type) {
    case SET_SEARCH_QUERY: {
      return {
        ...state,
        query: action.payload.query,
      }
    }
    case SET_SEARCH_RESULTS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case RESET_SEARCH_QUERY: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { profilesCount, ...rest } = initialState
      return {
        ...state,
        ...rest,
      }
    }
    case SET_PROFILES_COUNT: {
      return {
        ...state,
        profilesCount: action.payload,
      }
    }
    case SET_SEARCH_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case SET_FILTERS: {
      return {
        ...state,
        filters: action.payload.filters,
      }
    }
    case SET_FILTER: {
      const { name, value } = action.payload
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      }
    }
    case RESET_FILTERS: {
      const { filters, ...rest } = initialState
      return {
        ...state,
        ...rest,
      }
    }
    default:
      return state
  }
}
