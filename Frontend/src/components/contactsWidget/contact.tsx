import React from 'react'

import { ContactService } from '../../store/detail/types'

import styles from './contactsWidget.module.scss'
import Link from './contactLink'
import Icon from './contactIcon'

export interface Contact {
	contact: string,
	service: ContactService,
}

export default (props: Contact) => (
	<div className={styles.contact}>
		<Icon service={props.service} />
		<Link {...props} />
	</div>
)
