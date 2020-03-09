import {
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  RESET_SEARCH_QUERY,
  SET_PROFILES_COUNT,
  SearchState,
  SearchActionTypes,
} from './types'

const initialState: SearchState = {
  query: '',
  results: [],
  wasSearched: false,
  profilesCount: 0,
}

export function searchReducer(state = initialState, action: SearchActionTypes): SearchState {
  switch (action.type) {
    case SET_SEARCH_QUERY: {
      return {
        ...state,
        query: action.payload,
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
    default:
      return state
  }
}
