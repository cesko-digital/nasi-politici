import {
  SET_ARTICLES,
  RESET_ARTICLES,
  ArticlesActionTypes,
  SET_LOADING_ARTICLES_START,
  SET_LOADING_ARTICLES_END,
  LOAD_ARTICLES,
} from './types'
import { Article } from '../../services/apiTypes'

export const setArticles = (articles: Article[]): ArticlesActionTypes => ({
  type: SET_ARTICLES,
  payload: articles,
})

export const resetArticles = (): ArticlesActionTypes => ({
  type: RESET_ARTICLES,
})

export const loadingArticlesStarted = (): ArticlesActionTypes => ({
  type: SET_LOADING_ARTICLES_START,
})

export const loadingArticlesEnded = (): ArticlesActionTypes => ({
  type: SET_LOADING_ARTICLES_END,
})

export const loadArticles = (): ArticlesActionTypes => ({
  type: LOAD_ARTICLES,
})
