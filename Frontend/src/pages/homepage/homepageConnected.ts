import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { wasSearched } from 'store/search/selectors'

import Homepage from './homepage'
import { AppState } from 'store'

interface StateProps {
  wasSearched: boolean
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({ wasSearched })

export default connect(mapStateToProps)(Homepage)
