import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getDetailNews, isLoading } from 'store/articles/selectors'
import { loadArticles } from 'store/articles/actions'
import { getFullName } from 'store/detail/selectors'

import NewsWidget from './newsWidget'
import { AppState } from 'store'

interface Article {
  perex: string
  published: string
  source: string
  title: string
  url: string
}

interface StateProps {
  fullname: string
  news: Article[]
  isLoading: boolean
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  fullname: getFullName,
  news: getDetailNews,
  isLoading,
})

const dispatchProps = {
  loadNews: loadArticles,
}

export default connect(mapStateToProps, dispatchProps)(NewsWidget)
