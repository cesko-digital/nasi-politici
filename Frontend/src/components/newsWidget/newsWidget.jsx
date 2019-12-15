import React, {useState} from 'react'
import {createStructuredSelector} from 'reselect'
import { connect } from 'react-redux'
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
  return (
    <React.Fragment>
      <div className={styles.articles}>
        {!showAll && articles.slice(0, DEFAULT_ARTICLES_COUNT).map((article, index) => <Article article={article} key={index}/>)}
        {showAll && articles.map((article, index) => <Article article={article} key={index}/>)}
      </div>
      <div className={styles.showMore} onClick={() => setShowAll(!showAll)}>
        {!showAll && <div className={styles.more}>Zobrazit {articles.length - DEFAULT_ARTICLES_COUNT} dalších</div>}
        {showAll && <div className={styles.less}>Zobrazit méně</div>}
      </div>
    </React.Fragment>
  )
}

const EmptyState = () => {
  return (<div>Empty</div>)
}

const NewsWidget = ({news}) => {
  return (
		<React.Fragment>
      <div className={styles.widget}>
        <div className={styles.header}>
          <h2 className={styles.title}>V médiích</h2>
          <div className={styles.tags}>
            <div className={styles.tag}>
              <LinkBtn />
              <div className={styles.tagname}>
                <a href='https://monitora.cz/' rel="noopener noreferrer" target='_blank'>Monitora</a>
              </div>
            </div>
            <ReportBtn />
          </div>
        </div>
        {news.length > 0 && <Articles articles={news} />}
        {!news.length && <EmptyState />}
      </div>
		</React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  news: getDetailNews,
})

export default connect(mapStateToProps)(NewsWidget);
