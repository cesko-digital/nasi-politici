import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getConnections } from 'store/detail/selectors'

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
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  connections: getConnections,
})

export default connect(mapStateToProps)(Chart)
