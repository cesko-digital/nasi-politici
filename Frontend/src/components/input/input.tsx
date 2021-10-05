import React from 'react'
import classnames from 'classnames'
import styles from './input.module.scss'
import { DebounceInput, DebounceInputProps } from 'react-debounce-input'

type Props = DebounceInputProps<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>

export const Input: React.FC<Props> = props => (
  <div>
    <DebounceInput debounceTimeout={0} {...props} className={classnames(props.className, styles.input)} />
  </div>
)

export default Input
