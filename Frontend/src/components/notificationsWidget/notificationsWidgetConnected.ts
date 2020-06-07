import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  getFullName,
  getOfficialsRegisterId,
  getNotificationsCount,
  getShowAllNotifications,
  getNotifications,
  getRegisterStatementsSource,
} from 'store/detail/selectors'
import { toggleShowAllNotifications as toggleShowAll } from 'store/detail/actions'

import NotificationsWidget from './notificationsWidget'
import { AppState } from 'store'

interface StateProps {
  fullName: string
  notificationsCount: number
  notificationRegistryData: Array<{
    Id: string
    Type: string
    FromDate: string
    LegalBusinessAssociates: Array<{
      legalPerson: {
        name: string
      }
    }>
    OrganizationMember: Array<{
      type: {
        name: string
      }
      legalPerson: {
        name: string
      }
    }>
  }>
  officialsId: string
  showAll: boolean
  source: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  fullName: getFullName,
  source: getRegisterStatementsSource,
  officialsId: getOfficialsRegisterId,
  notificationRegistryData: getNotifications,
  notificationsCount: getNotificationsCount,
  showAll: getShowAllNotifications,
})

export default connect(mapStateToProps, { toggleShowAll })(NotificationsWidget)
