import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getSearchResults, getSearchQuery, wasSearched} from '../../store/search/selectors'
import Result from './result'

const mapStateToProps = createStructuredSelector({
  results: getSearchResults,
	query: getSearchQuery,
	wasSearched,
})

export default connect(mapStateToProps)(Result);
