import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setSearchQuery, search } from 'store/search/actions'
import { getSearchQuery } from 'store/search/selectors'

import Filters from './filters'
import { AppState } from 'store'

interface StateProps {
  query: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  query: getSearchQuery,
})

export default connect(mapStateToProps, { setSearchQuery, search })(Filters)
