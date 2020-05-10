import { createSelector } from 'reselect'

import { AppState } from 'store'
import { ArticlesState } from './types'
import { dummyFormatDate } from 'utils/date'

export const getArticles = (store: AppState): ArticlesState['articles'] => store.articles.articles
export const isLoading = (store: AppState): boolean => store.articles.loading

export const getDetailNews = createSelector(getArticles, articles => {
  return articles.map(article => {
    const HTMLEntitiesStrippedPerex = article.perex.replace(/&#([0-9]{1,3});/gi, (match, numStr) => String.fromCharCode(parseInt(numStr, 10)))
    return ({
    ...article,
    perex: HTMLEntitiesStrippedPerex,
    source: article.source.replace(new RegExp('^www.'), ''),
    published: dummyFormatDate(new Date(article.published)),
  })})
})
