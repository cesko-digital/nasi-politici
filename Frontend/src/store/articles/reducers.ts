import { SET_ARTICLES, ArticlesState, ArticlesActionTypes } from "./types";

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
    default:
      return state;
  }
}
