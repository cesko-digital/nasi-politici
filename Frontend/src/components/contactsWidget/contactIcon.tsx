import * as React from 'react'

import { ReactComponent as FBLogo } from 'assets/images/social-fb.svg'
import { ReactComponent as TWLogo } from 'assets/images/social-tw.svg'
import { ReactComponent as IGLogo } from 'assets/images/social-ig.svg'
import { ReactComponent as YTLogo } from 'assets/images/social-yt.svg'
import { ReactComponent as WebLogo } from 'assets/images/icon-globe.svg'
import { ReactComponent as Logo } from 'assets/images/social-web.svg'

import styles from './contactsWidget.module.scss'
import { ContactService } from '../../services/apiTypes'

interface Props {
  service: ContactService
}

export function ContactIcon({ service }: Props) {
  const iconProps = { width: 30, height: 30, className: styles.icon }
  switch (service) {
    case ContactService.Facebook:
    case ContactService.FacebookPage:
    case ContactService.FacebookProfile:
      return <FBLogo {...iconProps} />
    case ContactService.Twitter:
      return <TWLogo {...iconProps} />
    case ContactService.Instagram:
      return <IGLogo {...iconProps} />
    case ContactService.Youtube:
      return <YTLogo {...iconProps} />
    case ContactService.WWW:
      return <WebLogo className={styles.icon} />
    default:
      return <Logo className={styles.icon} />
  }
}
