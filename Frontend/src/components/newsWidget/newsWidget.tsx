import React, { useEffect } from 'react'
import classnames from 'classnames'
import NoData from 'components/emptyStates/noData/noData'
import LoadingData from 'components/emptyStates/loadingData/loadingData'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import ExplanationModal from 'components/explanationModal/explanationModal'

import styles from './newsWidget.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadArticles } from '../../store/articles/actions'
import { AppState } from '../../store'
import { getFullNameString } from '../../store/detail/selectors'
import { Article as ArticleType } from '../../services/apiTypes'

const DEFAULT_ARTICLES_COUNT = 3

interface ArticleProps {
  article: ArticleType
}

function Article({ article }: ArticleProps) {
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

interface ArticlesProps {
  articles: ArticleType[]
}

function Articles({ articles }: ArticlesProps) {
  const [showAll, setShowAll] = React.useState(false)
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

export function NewsWidget() {
  const dispatch = useDispatch()
  const { articles, loading } = useSelector((state: AppState) => state.articles)
  const { detail } = useSelector((state: AppState) => state.detail)
  const newsWidgetCustomClassNames = classnames(styles.widget, !articles.length && styles.noData)

  useEffect(() => {
    dispatch(loadArticles())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className={newsWidgetCustomClassNames}>
        <div className={styles.header}>
          <div className={styles.headerTitleWrapper}>
            <h2 className={styles.title}>V médiích</h2>
            <ExplanationModal title="V médiích">
              Mediální obraz politika Vám může leccos napovědět. Je k tomu potřeba přistupovat kriticky, jako ke všem
              ostatním informacím, ale mít přehled, co se v poslední době o politikovi napsalo, obzvlášť před volbami,
              se vždycky hodí. V našem přehledu je zobrazená doba určena jako 90 dní, a protože například takový Jan
              Novák je jako politik složitě vyhledatelný, kombinujeme jméno politika s jeho příslušností k aktuální
              straně. I tak se může stát, že nám se do přehledu dostane článek, který o tomto politikovi nepojednává.
              Pokud takový článek uvidíte, klikněte, prosím, na vlaječku a dejte nám o něm vědět, abychom ho mohli
              odstranit.
            </ExplanationModal>
          </div>
          {!!articles.length && (
            <div className={styles.tags}>
              <ReportModalTrigger
                className={styles.reportBtnWrapper}
                modalTitle={`${getFullNameString(detail)}, v médiích`}
              >
                <ReportBtn className={styles.reportBtn} />
              </ReportModalTrigger>
            </div>
          )}
        </div>
        {!loading && !!articles.length && <Articles articles={articles} />}
        {!loading && !articles.length && <NoData />}
        {loading && <LoadingData />}
      </div>
    </React.Fragment>
  )
}
