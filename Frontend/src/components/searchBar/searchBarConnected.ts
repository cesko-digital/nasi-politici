import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setSearchQuery, search, resetFilters } from 'store/search/actions'
import { getSearchQuery, wasSearched } from 'store/search/selectors'

import SearchBar from './searchBar'
import { AppState } from 'store'

interface StateProps {
  query: string
  wasSearched: boolean
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  query: getSearchQuery,
  wasSearched,
})

export default connect(mapStateToProps, { setSearchQuery, search, resetFilters })(SearchBar)
