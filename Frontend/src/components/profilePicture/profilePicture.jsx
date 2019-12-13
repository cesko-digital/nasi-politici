import React from 'react'
import classnames from 'classnames'

import styles from './profilePicture.module.scss'

export default ({src, name, customClassName}) => <img src={src} alt={name} className={classnames(customClassName, styles.picture)}/>;
