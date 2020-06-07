import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getRoles, getShowAllRoles, getRolesCount, getFullName, getRolesSource } from 'store/detail/selectors'
import { toggleShowAllRoles } from 'store/detail/actions'

import RolesWidget from './rolesWidget'
import { AppState } from 'store'

interface StateProps {
  rolesGroups: ReturnType<typeof getRoles>
  source: string
  showAll: boolean
  rolesCount: number
  fullname: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  rolesGroups: getRoles,
  source: getRolesSource,
  showAll: getShowAllRoles,
  rolesCount: getRolesCount,
  fullname: getFullName,
})

export default connect(mapStateToProps, { toggleShowAllRoles })(RolesWidget)
