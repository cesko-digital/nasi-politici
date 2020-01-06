
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getDonations, getShowAllDonations, getDonationsCount, getFullName} from '../../redux/selectors'
import {toggleShowAllDonations} from '../../redux/actions'
import DonationsWidget from './donationsWidget'

const mapStateToProps = createStructuredSelector({
  donationsGroups: getDonations,
  showAll: getShowAllDonations,
	donationsCount: getDonationsCount,
	fullname: getFullName,
})

export default connect(mapStateToProps, {toggleShowAllDonations})(DonationsWidget);
