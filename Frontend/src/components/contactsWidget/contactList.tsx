import React from 'react'

import styles from './contactsWidget.module.scss'
import Contact, {Contact as ContactType} from './contact'

interface Contacts {
	contacts: ContactType[],
	title: string,
}

export default (props: Contacts) => {
	if (props.contacts.length === 0) return null
	return (
		<React.Fragment>
			<div className={styles.subtitleWrapper}>
				<h3 className={styles.subtitle}>{props.title}</h3>
				<div className={styles.line} />
			</div>
			<div className={styles.contactsWrapper}>
				{props.contacts.map((contact, index) => {
					return (
						<Contact key={index} {...contact}/>
					)
				})}
			</div>
		</React.Fragment>
	)
}
