import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  getDonations,
  getShowAllDonations,
  getDonationsCount,
  getFullName,
  getDonationsSource,
} from 'store/detail/selectors'
import { toggleShowAllDonations as toggleShowAll } from 'store/detail/actions'
import DonationsWidget from './donationsWidget'
import { AppState } from 'store'

interface StateProps {
  donationsGroups: Array<{
    year: number
    items: Array<{
      party: string
      donatedAmount: number
    }>
  }>
  showAll: boolean
  donationsCount: number
  fullname: string
  source: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  donationsGroups: getDonations,
  showAll: getShowAllDonations,
  donationsCount: getDonationsCount,
  fullname: getFullName,
  source: getDonationsSource,
})

export default connect(mapStateToProps, { toggleShowAll })(DonationsWidget)
