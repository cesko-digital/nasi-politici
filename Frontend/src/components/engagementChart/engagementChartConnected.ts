import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getConnections, getFullName } from 'store/detail/selectors'

import Chart from './engagementChart'
import { AppState } from 'store'

interface StateProps {
  connections: Array<{
    company: string
    ico: string
    since: string
    until: string | null
    description: string
  }>
  fullName: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  connections: getConnections,
  fullName: getFullName,
})

export default connect(mapStateToProps)(Chart)
