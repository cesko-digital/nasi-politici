import React, {useCallback, useMemo} from 'react'
import classnames from 'classnames'
import styles from './modal.module.scss'

// TODO mozna pridat listener na ESC
export default ({children, onCloseRequest, className}) => {
	const contetnClassName = useMemo(() => classnames(styles.modalContent, className), [className])
	const onContentClick = useCallback((e) => {
		e.stopPropagation()
	}, [])

	return (
		<div
			className={styles.modalContainer}
			onClick={onCloseRequest}
		>
			<div onClick={onContentClick} className={contetnClassName}>{children}</div>
		</div>
	)
}
