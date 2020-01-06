import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { setSearchQuery, search } from '../../redux/actions'
import { getSearchQuery } from '../../redux/selectors'

import SearchBar from './searchBar'

const mapStateToProps = createStructuredSelector({
  query: getSearchQuery,
})

export default connect(mapStateToProps, { setSearchQuery, search })(SearchBar);
