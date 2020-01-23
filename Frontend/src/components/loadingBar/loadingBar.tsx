import * as React from 'react'
import styles from './loadingBar.module.scss'

const LoadingBar: React.FC = () => (
  <div className={styles.roller}>
    <div className={styles.wrapper}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  </div>
)

export default LoadingBar
