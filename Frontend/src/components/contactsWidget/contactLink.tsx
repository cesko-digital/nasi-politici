import React from 'react'

import { ContactService } from '../../store/detail/types'

import styles from './contactsWidget.module.scss'

interface Props {
	contact: string,
	service: ContactService,
}

export default (props: Props) => {
	let href = ''
	switch (props.service) {
		case ContactService.FacebookPage:
		case ContactService.FacebookProfile:
			href = `https://facebook.com/${props.contact}`
			break
		case ContactService.Twitter:
			href = `https://facebook.com/${props.contact}`
			break
		case ContactService.Instagram:
			href = `https://instagram.com/${props.contact}`
			break
		case ContactService.WWW:
			href = props.contact
			break
	}
	return (
		<a className={styles.link} href={href} rel="noopener noreferrer" target='_blank'>{props.contact}</a>
	)
}
