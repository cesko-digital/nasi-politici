import React from 'react'
import classNames from 'classnames'
import styles from './newsWidget.module.scss'

import { Article as ArticleType } from '../../services/apiTypes'

interface Props {
  article: ArticleType
}

export function ArticleTags({ article }: Props) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { is_fake_news } = article
  return (
    <div className={styles.articleTags}>
      {/* eslint-disable-next-line @typescript-eslint/camelcase */}
      {is_fake_news && <div className={classNames(styles.articleTag, styles.articleTagRed)}>Dezinformační web</div>}
    </div>
  )
}
