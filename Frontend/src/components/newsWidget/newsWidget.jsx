import React, {useState} from 'react'
import {createStructuredSelector} from 'reselect'
import { connect } from 'react-redux'
import classnames from 'classnames'
import NoData from '../../components/emptyStates/noData/noData'
import { ReactComponent as LinkBtn } from '../../assets/images/link.svg';
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {getDetailNews} from '../../redux/selectors'

import styles from './newsWidget.module.scss'

const DEFAULT_ARTICLES_COUNT = 2

const Article = ({article}) => {
  return (
      <div className={styles.article}>
        <div className={styles.sources}>
          <div className={styles.source}>{article.source}</div>
          <div>, {article.time}</div>
        </div>
        <div><a href={article.web} target='_blank' rel="noopener noreferrer" className={styles.headline}>{article.headline}</a></div>
      </div>
  )
}

const Articles = ({articles}) => {
	const [showAll, setShowAll] = useState(false)
	const hasMore = articles.length > DEFAULT_ARTICLES_COUNT
  return (
    <React.Fragment>
      <div className={styles.articles}>
        {!showAll && articles.slice(0, DEFAULT_ARTICLES_COUNT).map((article, index) => <Article article={article} key={index}/>)}
        {showAll && articles.map((article, index) => <Article article={article} key={index}/>)}
      </div>
      {hasMore && <div className={styles.showMore} onClick={() => setShowAll(!showAll)}>
        {!showAll && hasMore && <div className={styles.more}>Zobrazit {articles.length - DEFAULT_ARTICLES_COUNT} dalších</div>}
        {showAll && <div className={styles.less}>Zobrazit méně</div>}
      </div>}
    </React.Fragment>
  )
}

const NewsWidget = ({news}) => {
  const newsWidgetCustomClassNames = classnames(
    styles.widget,
    !news.length && styles.noData)

  return (
		<React.Fragment>
      <div className={newsWidgetCustomClassNames}>
        <div className={styles.header}>
          <h2 className={styles.title}>V médiích</h2>
          {!!news.length && <div className={styles.tags}>
            <div className={styles.tag}>
              <LinkBtn />
              <div className={styles.tagname}>
                <a href='https://monitora.cz/' rel="noopener noreferrer" target='_blank'>Monitora</a>
              </div>
            </div>
            <div className={styles.reportBtnWrapper}>
              <ReportBtn className={styles.reportBtn}/>
            </div>
          </div>}
        </div>
        {!!news.length && <Articles articles={news} />}
        {!news.length && <NoData />}
      </div>
		</React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  news: getDetailNews,
})

export default connect(mapStateToProps)(NewsWidget);
