import React from 'react'
import classnames from 'classnames'
import styles from './input.module.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = props => (
  <div>
    <input {...props} className={classnames(props.className, styles.input)} />
  </div>
)

export default Input
