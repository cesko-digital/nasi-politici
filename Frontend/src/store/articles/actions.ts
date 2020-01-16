import { Article, SET_ARTICLES, SetArticlesAction } from "./types";


export const setArticles = (articles: Article[]): SetArticlesAction => ({
	type: SET_ARTICLES,
	payload: articles,
});
