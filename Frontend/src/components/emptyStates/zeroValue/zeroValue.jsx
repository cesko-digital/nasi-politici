import React from 'react'
import classnames from 'classnames'
import {ReactComponent as Forbidden} from '../../../assets/images/forbidden.svg';
import styles from '../noData/noData.module.scss'

function ZeroValue(widget) {
  return (
    <div className={classnames(styles.emptyState, styles.zeroValue)}>
      <div className={styles.circle}>
        <Forbidden className={styles.image} />
      </div>
      <div className={styles.title}>{widget.title}</div>
    </div>
  )
}

export default ZeroValue;
