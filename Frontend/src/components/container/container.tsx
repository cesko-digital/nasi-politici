import React from 'react'
import classnames from 'classnames'

import styles from './container.module.scss'

interface Props {
  className?: string
}

export const Container: React.FC<Props> = ({ children, className }) => (
  <div className={classnames(className, styles.container)}>{children}</div>
)
