import { Article, SET_ARTICLES, RESET_ARTICLES, SetArticlesAction, ResetArticlesAction } from "./types";

export const setArticles = (articles: Article[]): SetArticlesAction => ({
	type: SET_ARTICLES,
	payload: articles,
});

export const resetArticles = (): ResetArticlesAction => ({
	type: RESET_ARTICLES,
});
