import {
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  RESET_SEARCH_QUERY,
  SET_PROFILES_COUNT,
  SearchState,
  SearchActionTypes,
  SET_SEARCH_LOADING,
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
    default:
      return state
  }
}
