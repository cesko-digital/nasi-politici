import * as React from 'react'
import { ReactComponent as LoaderDataImg } from 'assets/images/loader-data.svg'
import styles from './loadingData.module.scss'

const LoadingData: React.FC = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.circle}>
        <LoaderDataImg className={styles.image} />
      </div>
      <div className={styles.title}>Data se načítají</div>
    </div>
  )
}

export default LoadingData
