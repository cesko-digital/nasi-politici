import * as React from 'react'

import { ContactService } from 'store/detail/types'

import styles from './contactsWidget.module.scss'
import Link from './contactLink'
import Icon from './contactIcon'

export interface Contact {
  contact: string
  service: ContactService
}

const Contact: React.FC<Contact> = props => (
  <div className={styles.contact}>
    <Icon service={props.service} />
    <Link {...props} />
  </div>
)

export default Contact
