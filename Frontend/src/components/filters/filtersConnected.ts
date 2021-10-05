import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setFilter, filter } from 'store/search/actions'
import { getFilters } from 'store/search/selectors'

import Filters from './filters'
import { AppState } from 'store'
import { FiltersValues } from 'store/search/types'

interface StateProps {
  filters: FiltersValues
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  filters: getFilters,
})

export default connect(mapStateToProps, { setFilter, filter })(Filters)
