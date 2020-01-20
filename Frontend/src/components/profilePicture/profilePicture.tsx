import React from 'react'
import classnames from 'classnames'

import styles from './profilePicture.module.scss'
import { ClassValue } from 'classnames/types';

interface Props {
	src: string,
	name: string,
	customClassName?: ClassValue,
}

export default ({src, name, customClassName}: Props) => <img src={src} alt={name} className={classnames(customClassName, styles.picture)}/>;
