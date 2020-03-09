import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { wasSearched, getProfilesCount } from 'store/search/selectors'
import { onEnter } from 'store/search/actions'

import Homepage from './homepage'
import { AppState } from 'store'

interface StateProps {
  wasSearched: boolean
  profilesCount: number
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({ wasSearched, profilesCount: getProfilesCount })

export default connect(mapStateToProps, { onEnter })(Homepage)
