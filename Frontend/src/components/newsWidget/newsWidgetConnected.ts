import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getDetailNews } from '../../store/articles/selectors'
import { getFullName } from '../../store/detail/selectors'

import NewsWidget from './newsWidget'
import { AppState } from '../../store'

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
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  fullname: getFullName,
  news: getDetailNews,
})

export default connect(mapStateToProps)(NewsWidget)
