import { createSelector } from 'reselect'

import { AppState } from 'store'
import { ArticlesState } from './types'
import { dummyFormatDate } from 'utils/date'

export const getArticles = (store: AppState): ArticlesState['articles'] => store.articles.articles

export const getDetailNews = createSelector(getArticles, articles => {
  return articles.map(a => ({
    ...a,
    source: a.source.replace(new RegExp('^www.'), ''),
    published: dummyFormatDate(new Date(a.published)),
  }))
})
