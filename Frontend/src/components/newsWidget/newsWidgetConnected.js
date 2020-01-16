import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDetailNews} from '../../store/articles/selectors'
import {getFullName} from '../../store/detail/selectors'

import NewsWidget from './newsWidget'

const mapStateToProps = createStructuredSelector({
  fullname: getFullName,
  news: getDetailNews,
})

export default connect(mapStateToProps)(NewsWidget);
