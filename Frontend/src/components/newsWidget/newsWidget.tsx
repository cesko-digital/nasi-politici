import * as React from 'react'
import classnames from 'classnames'
import NoData from '../emptyStates/noData/noData'
import ReportModalTrigger from '../reportModal/reportModalTriggerConnected'
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg'

import styles from './newsWidget.module.scss'

const DEFAULT_ARTICLES_COUNT = 2

interface ArticleProps {
  perex: string
  published: string
  source: string
  title: string
  url: string
}

const Article: React.FC<ArticleProps> = ({ source, published, url, title, perex }) => {
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

interface ArticlesProps {
  articles: ArticleProps[]
}

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const [showAll, setShowAll] = React.useState(false)
  const hasMore = articles.length > DEFAULT_ARTICLES_COUNT
  return (
    <React.Fragment>
      <div className={styles.articles}>
        {!showAll &&
          articles.slice(0, DEFAULT_ARTICLES_COUNT).map((article, index) => <Article {...article} key={index} />)}
        {showAll && articles.map((article, index) => <Article {...article} key={index} />)}
      </div>
      {hasMore && (
        <div className={styles.showMore} onClick={(): void => setShowAll(!showAll)}>
          {!showAll && hasMore && (
            <div className={styles.more}>Zobrazit {articles.length - DEFAULT_ARTICLES_COUNT} dalších</div>
          )}
          {showAll && <div className={styles.less}>Zobrazit méně</div>}
        </div>
      )}
    </React.Fragment>
  )
}

interface Props {
  news: ArticleProps[]
  fullname: string
}

const NewsWidget: React.FC<Props> = ({ news, fullname }) => {
  const newsWidgetCustomClassNames = classnames(styles.widget, !news.length && styles.noData)

  return (
    <React.Fragment>
      <div className={newsWidgetCustomClassNames}>
        <div className={styles.header}>
          <h2 className={styles.title}>V médiích</h2>
          {!!news.length && (
            <div className={styles.tags}>
              <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${fullname}, v médiích`}>
                <ReportBtn className={styles.reportBtn} />
              </ReportModalTrigger>
            </div>
          )}
        </div>
        {!!news.length && <Articles articles={news} />}
        {!news.length && <NoData />}
      </div>
    </React.Fragment>
  )
}

export default NewsWidget
