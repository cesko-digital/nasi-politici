import { connect } from 'react-redux'
import { openReportModal } from 'store/report/actions'

import Trigger from './reportModalTrigger'

export default connect(null, { openReportModal })(Trigger)
