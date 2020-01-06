import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDetailNews} from '../../redux/selectors'

import NewsWidget from './newsWidget'

const mapStateToProps = createStructuredSelector({
  news: getDetailNews,
})

export default connect(mapStateToProps)(NewsWidget);
