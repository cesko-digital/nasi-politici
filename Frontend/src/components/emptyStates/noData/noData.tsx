import * as React from 'react'
import { ReactComponent as NoDataImg } from 'assets/images/collection.svg'
import styles from './noData.module.scss'

const NoData: React.FC = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.circle}>
        <NoDataImg className={styles.image} />
      </div>
      <div className={styles.title}>Pro tuto kategorii zatím nemáme ověřená data :/</div>
    </div>
  )
}

export default NoData
