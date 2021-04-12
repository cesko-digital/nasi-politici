import * as React from 'react'
import classnames from 'classnames'

import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import NoData from 'components/emptyStates/noData/noData'
import ExplanationModal from 'components/explanationModal/explanationModal'

import styles from './contactsWidget.module.scss'
import { ContactList } from './contactList'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { ContactService } from '../../services/apiTypes'
import { getFullNameString } from '../../store/detail/selectors'

export function ContactsWidget() {
  const {
    detail,
    detail: { contacts },
  } = useSelector((state: AppState) => state.detail)
  const socialNetworksContacts = contacts.filter(contact => contact.Network !== ContactService.WWW)
  const webContacts = contacts.filter(contact => contact.Network === ContactService.WWW)
  const hasContacts = contacts.length > 0
  const contactsWidgetCustomClassNames = classnames(styles.widget, !hasContacts && styles.noData)

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
        {hasContacts && (
          <div>
            <ReportModalTrigger
              className={styles.reportBtnWrapper}
              modalTitle={`${getFullNameString(detail)}, kontakty`}
            >
              <ReportBtn className={styles.reportBtn} />
            </ReportModalTrigger>
          </div>
        )}
      </div>
      {!hasContacts && <NoData />}
      {hasContacts && (
        <React.Fragment>
          <ContactList title="Socialní sítě" contacts={socialNetworksContacts} />
          <ContactList title="Web" contacts={webContacts} />
        </React.Fragment>
      )}
    </div>
  )
}
