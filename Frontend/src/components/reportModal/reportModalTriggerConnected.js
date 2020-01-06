import {connect} from 'react-redux'
import {openReportModal} from '../../redux/actions'

import Trigger from './reportModalTrigger'

export default connect(null, {openReportModal})(Trigger);
