import * as React from 'react'

import styles from './contactsWidget.module.scss'
import { Contact, ContactService } from '../../services/apiTypes'

type Props = {
  contact: Contact
}

function getLink(contact: Contact) {
  const { Contact, Network } = contact
  switch (Network) {
    case ContactService.FacebookPage:
    case ContactService.FacebookProfile:
      return `https://facebook.com/${Contact}`
    case ContactService.Twitter:
      return `https://twitter.com/${Contact}`
    case ContactService.Instagram:
      return `https://instagram.com/${Contact}`
    default:
      return Contact
  }
}

function getLinkText(contact: Contact) {
  return contact.Network === ContactService.Youtube ? contact.NetworkText : contact.Contact
}

export function ContactLink({ contact }: Props) {
  return (
    <a className={styles.link} href={getLink(contact)} rel="noopener noreferrer" target="_blank">
      {getLinkText(contact)}
    </a>
  )
}
