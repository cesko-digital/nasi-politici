import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isReportModalOpen, getReportModalTitle } from '../../store/report/selectors'
import { closeReportModal, submitReportModal } from '../../store/report/actions'

import ReportModal from './reportModal'
import { AppState } from '../../store'

interface StateProps {
  isReportModalOpen: boolean
  title: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  isReportModalOpen,
  title: getReportModalTitle,
})

export default connect(mapStateToProps, { closeReportModal, submit: submitReportModal })(ReportModal)
