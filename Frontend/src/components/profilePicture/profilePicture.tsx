import * as React from 'react'
import classnames from 'classnames'

import styles from './profilePicture.module.scss'
import { ClassValue } from 'classnames/types'

interface Props {
  src: string
  name: string
  customClassName?: ClassValue
}

const ProfilePicture: React.FC<Props> = ({ src, name, customClassName }) => (
  <img src={src} alt={name} className={classnames(customClassName, styles.picture)} />
)

export default ProfilePicture
