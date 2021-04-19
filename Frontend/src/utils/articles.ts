import { Article } from '../services/apiTypes'
import { dummyFormatDate } from './date'

export function getEnhancedArticles(articles: Article[]) {
  return articles.map(article => {
    const HTMLEntitiesStrippedPerex = article.perex.replace(/&#([0-9]{1,3});/gi, (match, numStr) =>
      String.fromCharCode(parseInt(numStr, 10)),
    )
    return {
      ...article,
      perex: HTMLEntitiesStrippedPerex,
      source: article.source.replace(new RegExp('^www.'), ''),
      published: dummyFormatDate(new Date(article.published)),
    }
  })
}
