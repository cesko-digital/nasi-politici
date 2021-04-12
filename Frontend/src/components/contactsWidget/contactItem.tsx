import * as React from 'react'

import styles from './contactsWidget.module.scss'
import { ContactLink } from './contactLink'
import { ContactIcon } from './contactIcon'
import { Contact } from '../../services/apiTypes'

type Props = {
  contact: Contact
}

export function ContactItem({ contact }: Props) {
  return (
    <div className={styles.contact}>
      <ContactIcon service={contact.Network} />
      <ContactLink contact={contact} />
    </div>
  )
}
