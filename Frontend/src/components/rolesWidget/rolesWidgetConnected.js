import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getRoles, getShowAllRoles, getRolesCount, getFullName} from '../../redux/selectors'
import {toggleShowAllRoles} from '../../redux/actions'

import RolesWidget from './rolesWidget'

const mapStateToProps = createStructuredSelector({
  rolesGroups: getRoles,
  showAll: getShowAllRoles,
	rolesCount: getRolesCount,
	fullname: getFullName,
})

export default connect(mapStateToProps, {toggleShowAllRoles})(RolesWidget);
