
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDonations, getShowAllDonations, getDonationsCount, getFullName} from '../../store/detail/selectors'
import {toggleShowAllDonations} from '../../store/detail/actions'
import DonationsWidget from './donationsWidget'

const mapStateToProps = createStructuredSelector({
  donationsGroups: getDonations,
  showAll: getShowAllDonations,
	donationsCount: getDonationsCount,
	fullname: getFullName,
})

export default connect(mapStateToProps, {toggleShowAllDonations})(DonationsWidget);
