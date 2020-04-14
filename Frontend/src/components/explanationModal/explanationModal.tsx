import * as React from 'react'
import style from './explanationModal.module.scss'
import Modal from 'components/modal/modal'
import { ReactComponent as ExplanationBtn } from 'assets/images/explanation.svg'

export interface Props {
  children: React.ReactNode
  title: string
}

const ExplanationModal: React.FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const onTriggerClick = (): void => setIsOpen(true)
  const onClose = (): void => setIsOpen(false)

  return (
    <React.Fragment>
      <div className={style.explanationBtnWrapper} onClick={onTriggerClick}>
        <ExplanationBtn className={style.explanation} />
      </div>
      {isOpen && (
        <Modal onCloseRequest={onClose} className={style.modalWrapper}>
          <div className={style.header}>
            <div className={style.icon}>
              <div className={style.headTitle}>{title}</div>
            </div>
            <div className={style.cancel} onClick={onClose}>
              Zavřít
            </div>
          </div>
          <div className={style.body}>{children}</div>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default ExplanationModal
