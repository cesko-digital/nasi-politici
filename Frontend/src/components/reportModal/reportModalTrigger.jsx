import React, {useCallback} from 'react'
import {connect} from 'react-redux'
import {openReportModal} from '../../redux/actions'

const Trigger = ({modalTitle, children, openReportModal, className}) => {

	const onClick = useCallback(() => {
		openReportModal(modalTitle)
	}, [modalTitle, openReportModal])

	return (
		<div className={className} onClick={onClick}>{children}</div>
	)
}

export default connect(null, {openReportModal})(Trigger);
