import React, { useState } from 'react'
import classnames from 'classnames'
import styles from './newsWidget.module.scss'

import { Article as ArticleType } from '../../services/apiTypes'
import { Article } from './article'

const DEFAULT_ARTICLES_COUNT = 3

interface Props {
  articles: ArticleType[]
}

export function Articles({ articles }: Props) {
  const [showAll, setShowAll] = useState(false)
  const hasMore = articles.length > DEFAULT_ARTICLES_COUNT
  const articlesLength = articles.length
  return (
    <React.Fragment>
      <div
        className={classnames(
          styles.articles,
          articlesLength < DEFAULT_ARTICLES_COUNT && styles['columns' + articlesLength],
          articlesLength >= DEFAULT_ARTICLES_COUNT && styles.multicolumn,
        )}
      >
        {!showAll &&
          articles.slice(0, DEFAULT_ARTICLES_COUNT).map(article => <Article key={article.id} article={article} />)}
        {showAll && articles.map(article => <Article key={article.id} article={article} />)}
      </div>
      {hasMore && (
        <div className={styles.showMore} onClick={() => setShowAll(prev => !prev)}>
          {!showAll && hasMore && (
            <div className={styles.more}>Zobrazit {articles.length - DEFAULT_ARTICLES_COUNT} dalších</div>
          )}
          {showAll && <div className={styles.less}>Zobrazit méně</div>}
        </div>
      )}
    </React.Fragment>
  )
}
