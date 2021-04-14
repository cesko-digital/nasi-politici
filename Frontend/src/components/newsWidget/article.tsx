import React from 'react'
import styles from './newsWidget.module.scss'

import { Article as ArticleType } from '../../services/apiTypes'
import { ArticleTags } from './articleTags'

interface Props {
  article: ArticleType
}

export function Article({ article }: Props) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { perex, title, published, source, url, is_fake_news } = article
  // eslint-disable-next-line @typescript-eslint/camelcase
  const hasTags = !!is_fake_news
  return (
    <div className={styles.article}>
      <div className={styles.sources}>
        <div className={styles.source}>{source}</div>
        <div>, {published}</div>
      </div>
      {hasTags && <ArticleTags article={article} />}
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.headline}>
          {title}
        </a>
      </div>
      <div className={styles.perex}>{perex}</div>
    </div>
  )
}
