import { Article, SET_ARTICLES, RESET_ARTICLES, ArticlesActionTypes } from './types'

export const setArticles = (articles: Article[]): ArticlesActionTypes => ({
  type: SET_ARTICLES,
  payload: articles,
})

export const resetArticles = (): ArticlesActionTypes => ({
  type: RESET_ARTICLES,
})
