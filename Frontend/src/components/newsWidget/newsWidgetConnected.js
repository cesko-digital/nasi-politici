import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDetailNews, getFullName} from '../../redux/selectors'

import NewsWidget from './newsWidget'

const mapStateToProps = createStructuredSelector({
  fullname: getFullName,
  news: getDetailNews,
})

export default connect(mapStateToProps)(NewsWidget);
