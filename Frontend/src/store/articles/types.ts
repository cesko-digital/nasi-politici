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
export const RESET_ARTICLES = 'RESET_ARTICLES'

export interface SetArticlesAction {
  type: typeof SET_ARTICLES;
  payload: Article[];
}

export interface ResetArticlesAction {
  type: typeof RESET_ARTICLES;
}

export type ArticlesActionTypes = SetArticlesAction | ResetArticlesAction;
