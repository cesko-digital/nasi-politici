import * as React from 'react'
import classnames from 'classnames'
import styles from './modal.module.scss'
import { ClassValue } from 'classnames/types'

interface Props {
  children: React.ReactNode
  onCloseRequest: () => void
  className: ClassValue
}

// TODO mozna pridat listener na ESC
const Modal: React.FC<Props> = ({ children, onCloseRequest, className }) => {
  const contetnClassName = React.useMemo(() => classnames(styles.modalContent, className), [className])
  const onContentClick = React.useCallback(e => {
    e.stopPropagation()
  }, [])

  return (
    <div className={styles.modalContainer} onClick={onCloseRequest}>
      <div onClick={onContentClick} className={contetnClassName}>
        {children}
      </div>
    </div>
  )
}

export default Modal
