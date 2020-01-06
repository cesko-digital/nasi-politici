import React, {useCallback} from 'react'

export default ({modalTitle, children, openReportModal, className}) => {

	const onClick = useCallback(() => {
		openReportModal(modalTitle)
	}, [modalTitle, openReportModal])

	return (
		<div className={className} onClick={onClick}>{children}</div>
	)
}
