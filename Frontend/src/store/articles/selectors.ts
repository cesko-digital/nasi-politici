import { createSelector } from 'reselect'

import { AppState } from '../index'
import { ArticlesState } from './types'

export const getArticles = (store: AppState): ArticlesState['articles'] => store.articles.articles

export const getDetailNews = createSelector(getArticles, articles => {
  return articles.map(a => ({
    ...a,
    source: a.source.replace(new RegExp('^www.'), ''),
    published: new Date(a.published).toLocaleDateString('cs-CZ', { day: '2-digit', month: 'long', year: 'numeric' }),
  }))
})
