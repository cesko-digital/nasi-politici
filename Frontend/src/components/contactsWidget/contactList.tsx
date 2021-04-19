import * as React from 'react'

import styles from './contactsWidget.module.scss'
import { ContactItem } from './contactItem'
import { Contact } from '../../services/apiTypes'

interface Props {
  contacts: Contact[]
  title: string
}

export function ContactList({ contacts, title }: Props) {
  if (contacts.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <div className={styles.subtitleWrapper}>
        <h3 className={styles.subtitle}>{title}</h3>
        <div className={styles.line} />
      </div>
      <div className={styles.contactsWrapper}>
        {contacts.map((contact, index) => {
          return <ContactItem key={index} contact={contact} />
        })}
      </div>
    </React.Fragment>
  )
}
