import * as React from 'react'

import { ContactService } from '../../store/detail/types'
import { ReactComponent as FBLogo } from '../../assets/images/social-fb.svg'
import { ReactComponent as TWLogo } from '../../assets/images/social-tw.svg'
import { ReactComponent as IGLogo } from '../../assets/images/social-ig.svg'
import { ReactComponent as WebLogo } from '../../assets/images/social-web.svg'

import styles from './contactsWidget.module.scss'

interface IconProps {
  service: ContactService
}

const ContactIcon: React.FC<IconProps> = props => {
  switch (props.service) {
    case ContactService.FacebookPage:
    case ContactService.FacebookProfile:
      return <FBLogo className={styles.icon} />
    case ContactService.Twitter:
      return <TWLogo className={styles.icon} />
    case ContactService.Instagram:
      return <IGLogo className={styles.icon} />
    case ContactService.WWW:
      return <WebLogo className={styles.icon} />
  }
}

export default ContactIcon
