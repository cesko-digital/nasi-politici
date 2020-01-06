import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getSearchResults, isSearchLoading, getSearchQuery} from '../../redux/selectors'
import Result from './result'

const mapStateToProps = createStructuredSelector({
  results: getSearchResults,
	loading: isSearchLoading,
  query: getSearchQuery,
})

export default connect(mapStateToProps)(Result);
