import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {isReporModalOpen, getReporModalTitle} from '../../redux/selectors'
import {closeReportModal, submitReportModal} from '../../redux/actions'

import ReportModal from './reportModal'

const mapStateToProps = createStructuredSelector({
	isReporModalOpen,
	title: getReporModalTitle
})

export default connect(mapStateToProps, {closeReportModal, submit: submitReportModal})(ReportModal);
