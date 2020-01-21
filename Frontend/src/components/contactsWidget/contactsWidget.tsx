import React from 'react'
import classnames from 'classnames'

import ReportModalTrigger from '../reportModal/reportModalTriggerConnected'
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg'
import NoData from '../emptyStates/noData/noData'

import styles from './contactsWidget.module.scss'
import {Contact as ContactType} from './contact'
import ContactsList from './contactList'

interface Props {
	fullname: string,
	hasContacts: boolean,
	socialNetworksContacts: ContactType[],
	webContacts: ContactType[],
}

export default (props: Props) => {

  const contactsWidgetCustomClassNames = classnames(styles.widget, !props.hasContacts && styles.noData)

  return (
		<div className={contactsWidgetCustomClassNames}>
			<div className={styles.header}>
				<h2 className={styles.title}>Kontakty</h2>
				{props.hasContacts && <div>
					<ReportModalTrigger
						className={styles.reportBtnWrapper}
						modalTitle={`${props.fullname}, kontakty`}
					>
						<ReportBtn className={styles.reportBtn}/>
					</ReportModalTrigger>
				</div>}
			</div>
			{!props.hasContacts && <NoData />}
			{props.hasContacts &&
				<React.Fragment>
					<ContactsList title='Socialní sítě' contacts={props.socialNetworksContacts} />
					<ContactsList title='Web' contacts={props.webContacts} />
				</React.Fragment>}
		</div>
	);
}
