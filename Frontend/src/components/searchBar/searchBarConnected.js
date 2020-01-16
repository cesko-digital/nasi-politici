import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { setSearchQuery, search } from '../../store/search/actions'
import { getSearchQuery } from '../../store/search/selectors'

import SearchBar from './searchBar'

const mapStateToProps = createStructuredSelector({
  query: getSearchQuery,
})

export default connect(mapStateToProps, { setSearchQuery, search })(SearchBar);
