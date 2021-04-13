import React from 'react'
import styles from './newsWidget.module.scss'

import { Article } from '../../services/apiTypes'

type Props = {
  article: Article
}

export function Article({ article }: Props) {
  const { perex, title, published, source, url } = article
  return (
    <div className={styles.article}>
      <div className={styles.sources}>
        <div className={styles.source}>{source}</div>
        <div>, {published}</div>
      </div>
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.headline}>
          {title}
        </a>
      </div>
      <div className={styles.perex}>{perex}</div>
    </div>
  )
}
