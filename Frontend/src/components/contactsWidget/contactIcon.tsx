import * as React from 'react'

import { ReactComponent as FBLogo } from 'assets/images/social-fb.svg'
import { ReactComponent as TWLogo } from 'assets/images/social-tw.svg'
import { ReactComponent as IGLogo } from 'assets/images/social-ig.svg'
import { ReactComponent as WebLogo } from 'assets/images/icon-globe.svg'
import { ReactComponent as Logo } from 'assets/images/social-web.svg'

import styles from './contactsWidget.module.scss'
import { ContactService } from '../../services/apiTypes'

type Props = {
  service: ContactService
}

export function ContactIcon({ service }: Props) {
  switch (service) {
    case ContactService.Facebook:
    case ContactService.FacebookPage:
    case ContactService.FacebookProfile:
      return <FBLogo className={styles.icon} />
    case ContactService.Twitter:
      return <TWLogo className={styles.icon} />
    case ContactService.Instagram:
      return <IGLogo className={styles.icon} />
    case ContactService.WWW:
      return <WebLogo className={styles.icon} />
    default:
      return <Logo className={styles.icon} />
  }
}
