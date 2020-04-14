import * as React from 'react'
import classnames from 'classnames'

import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import NoData from 'components/emptyStates/noData/noData'
import ExplanationModal from 'components/explanationModal/explanationModal'

import styles from './contactsWidget.module.scss'
import { Contact as ContactType } from './contact'
import ContactsList from './contactList'

interface Props {
  fullname: string
  hasContacts: boolean
  socialNetworksContacts: ContactType[]
  webContacts: ContactType[]
}

const ContactsWidget: React.FC<Props> = props => {
  const contactsWidgetCustomClassNames = classnames(styles.widget, !props.hasContacts && styles.noData)

  return (
    <div className={contactsWidgetCustomClassNames}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Kontakty</h2>
          <ExplanationModal title="Kontakty">
            Chcete se s politikem/političkou spojit? Chcete si ověřit, které jsou oficiální profily? Tak jste v téhle
            škatulce správně! Najdete zde sesbírané kontakty z veřejných zdrojů, ať už z osobních stránek, stránek
            institucí, kde politik/politička působí, sociálních sítí, a dalších. Pokud víte o kontaktu, který nám unikl,
            klikněte na vlaječku a pošlete nám upozornění.
          </ExplanationModal>
        </div>
        {props.hasContacts && (
          <div>
            <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${props.fullname}, kontakty`}>
              <ReportBtn className={styles.reportBtn} />
            </ReportModalTrigger>
          </div>
        )}
      </div>
      {!props.hasContacts && <NoData />}
      {props.hasContacts && (
        <React.Fragment>
          <ContactsList title="Socialní sítě" contacts={props.socialNetworksContacts} />
          <ContactsList title="Web" contacts={props.webContacts} />
        </React.Fragment>
      )}
    </div>
  )
}

export default ContactsWidget
