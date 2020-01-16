export interface Article {
	id: number;
	perex: string;
	published: string;
	shares: number;
	source: string;
	text: string;
	title: string;
	url: string;
}

export interface ArticlesState {
	articles: Article[];
}

export const SET_ARTICLES = 'SET_ARTICLES'

export interface SetArticlesAction {
  type: typeof SET_ARTICLES;
  payload: Article[];
}

export type ArticlesActionTypes = SetArticlesAction;
