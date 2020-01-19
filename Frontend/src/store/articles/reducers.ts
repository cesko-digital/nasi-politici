import { SET_ARTICLES, RESET_ARTICLES, ArticlesState, ArticlesActionTypes } from "./types";

const initialState: ArticlesState = {
	articles: []
};

export function articlesReducer(
  state = initialState,
  action: ArticlesActionTypes
): ArticlesState {
  switch (action.type) {
    case SET_ARTICLES: {
      return {
        ...state,
        articles: action.payload,
      };
    }
    case RESET_ARTICLES: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
