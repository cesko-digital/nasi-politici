import {
  SET_ARTICLES,
  RESET_ARTICLES,
  ArticlesState,
  ArticlesActionTypes,
  SET_LOADING_ARTICLES_END,
  SET_LOADING_ARTICLES_START,
} from './types'

const initialState: ArticlesState = {
  articles: [],
  loading: false,
}

export function articlesReducer(state = initialState, action: ArticlesActionTypes): ArticlesState {
  switch (action.type) {
    case SET_ARTICLES: {
      return {
        ...state,
        articles: action.payload,
      }
    }
    case RESET_ARTICLES: {
      return {
        ...initialState,
      }
    }
    case SET_LOADING_ARTICLES_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case SET_LOADING_ARTICLES_END: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
