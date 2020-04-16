export interface Article {
  id: number
  perex: string
  published: string
  shares: number
  source: string
  text: string
  title: string
  url: string
}

export interface ArticlesState {
  articles: Article[]
  loading: boolean
}

export const SET_ARTICLES = 'SET_ARTICLES'
export const RESET_ARTICLES = 'RESET_ARTICLES'
export const LOAD_ARTICLES = 'LOAD_ARTICLES'
export const SET_LOADING_ARTICLES_END = 'SET_LOADING_ARTICLES_END'
export const SET_LOADING_ARTICLES_START = 'SET_LOADING_ARTICLES_START'
interface SetArticlesAction {
  type: typeof SET_ARTICLES
  payload: Article[]
}

interface ResetArticlesAction {
  type: typeof RESET_ARTICLES
}

interface SetLoadingNewsStartAction {
  type: typeof SET_LOADING_ARTICLES_START
}

interface SetLoadingNewsEndAction {
  type: typeof SET_LOADING_ARTICLES_END
}

export interface LoadNewsAction {
  type: typeof LOAD_ARTICLES
}

export type ArticlesActionTypes =
  | SetArticlesAction
  | ResetArticlesAction
  | SetLoadingNewsStartAction
  | SetLoadingNewsEndAction
  | LoadNewsAction
