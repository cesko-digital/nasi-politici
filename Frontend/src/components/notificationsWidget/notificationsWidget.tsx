import * as React from 'react'
import classnames from 'classnames'
import NoData from 'components/emptyStates/noData/noData'
import { ReactComponent as LinkBtn } from 'assets/images/link.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import { ReactComponent as RedirectBtn } from 'assets/images/redirect.svg'
import { DEFAULT_NOTIFICATION_LIMIT } from 'constants/constants'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'

import styles from './notificationsWidget.module.scss'

const notificationType = (type: string) => {
  switch (type) {
    case 'INGOING':
      return 'Vstupní oznámení'
    case 'ONGOING':
      return 'Průběžné oznámení'
    case 'OUTGOING':
      return 'Výstupní oznámení'
    default:
      return 'Neveřejné oznámení'
  }
}

interface NotificationProps {
  key: number,
  officialsId: string,
  notification: {
    Id: string,
    Type: string,
    FromDate: string,
    LegalBusinessAssociates: Array<{
      legalPerson: {
        name: string,
      },
    }>,
    OrganizationMember: Array<{
      type: {
        name: string,
      },
      legalPerson: {
        name: string,
      }
    }>,
    Visibility?: string,
  }
}

const Notification: React.FC<NotificationProps> = ({officialsId, notification}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const collapse = (): void => setIsCollapsed(!isCollapsed)

  const date = new Date(notification.FromDate)
  const notificationId = notification.Id
  const notificationOnRequest = notification.Visibility === "REQUEST"
  const linkToRegisterPublic = `https://cro.justice.cz/verejnost/funkcionari/${officialsId}/oznameni/${notificationId}`
  const linkToRegisterNotPublic = `https://cro.justice.cz/verejnost/funkcionari/form/${officialsId}`
  const linkToRegister = notificationOnRequest ? linkToRegisterNotPublic : linkToRegisterPublic
  return (
    <div className={styles.notification}>
      <div className={styles.subtitleWrapper} onClick={() => collapse()}>
        <span className={styles.subtitle}>{notificationType(notification.Type)}</span>
        <strong>&nbsp;({Intl.DateTimeFormat('cs-CZ').format(date)})</strong>
        <div className={styles.line} />
      </div>
      <div className={classnames(styles.collapsable, isCollapsed && styles.collapsed)}>
        {!!notification.LegalBusinessAssociates && !!notification.LegalBusinessAssociates.length && 
          <div className={styles.itemDesignation}>Společník nebo člen podnikající právnické osoby</div>}
        {!!notification.LegalBusinessAssociates && !!notification.LegalBusinessAssociates.length &&
          notification.LegalBusinessAssociates.map((item, index) => {
            return (
              <div key={index} className={styles.tableRow}>
                <div className={styles.name}>{item.legalPerson.name}</div>
              </div>
            )
          })
        }
        {!!notification.OrganizationMember && !!notification.OrganizationMember &&
          notification.OrganizationMember.map((item) => {
            return (
              <React.Fragment>
                <div className={styles.itemDesignation}>{item.type.name}</div>
                <div className={styles.tableRow}>
                  <div className={styles.name}>{item.legalPerson.name}</div>
                </div>
              </React.Fragment>
            )
          })}
        <div className={styles.linkWrapper}>
          <a className={styles.link} href={linkToRegister} rel="noopener noreferrer" target="_blank">
            Peněžité příjmy nebo jiné majet. výhody a dary</a>
            <RedirectBtn className={classnames(styles.redirectBtn, notificationOnRequest && styles.disabled)} href={linkToRegister} />
        </div>
      </div>
    </div>
  )
}

interface NotificationsProps {
  officialsId: string
  notificationRegistryData: Array<{
    Id: string,
    Type: string,
    FromDate: string,
    LegalBusinessAssociates: Array<{
      legalPerson: {
        name: string,
      },
    }>,
    OrganizationMember: Array<{
      type: {
        name: string,
      },
      legalPerson: {
        name: string,
      }
    }>,
  }>
  showAll: boolean
  toggleShowAll: () => void
  notificationsCount: number
}

const Notifications: React.FC<NotificationsProps> = ({ notificationsCount, officialsId, notificationRegistryData, toggleShowAll, showAll }) => {
  const hasMore = notificationsCount > DEFAULT_NOTIFICATION_LIMIT
  return (
    <React.Fragment>
      {notificationRegistryData.map((notification, index) => {
        return (
          <Notification key={index} notification={notification} officialsId={officialsId} />
        )
      })}
      {hasMore && (
        <div className={styles.showMore} onClick={toggleShowAll}>
          {!showAll && <div className={styles.more}>Zobrazit {notificationsCount - DEFAULT_NOTIFICATION_LIMIT} dalších</div>}
          {showAll && <div className={styles.less}>Zobrazit méně</div>}
        </div>
      )}
    </React.Fragment>
  )
}

interface Props extends NotificationsProps {
  fullName: string
}

const NotificationsWidget: React.FC<Props> = ({ notificationsCount, officialsId, notificationRegistryData, fullName, toggleShowAll, showAll }) => {
  const rolesWidgetCustomClassNames = classnames(
    styles.widget,
    styles.widgetWithTable,
    styles.roles,
    !notificationRegistryData.length && styles.noData,
  )

  return (
    <div className={rolesWidgetCustomClassNames}>
      <div className={styles.header}>
        <div className={styles.headerTitleWrapper}>
          <h2 className={styles.title}>CENTRÁLNÍ REGISTR OZNÁMENÍ</h2>
        </div>
        {!!notificationRegistryData.length && (
          <div className={styles.tags}>
            <div className={styles.tag}>
              <LinkBtn />
              <div className={styles.tagname}>
                <a href="https://www.hlidacstatu.cz/" rel="noopener noreferrer" target="_blank">hlidacstatu.cz</a>
              </div>
            </div>
            <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${fullName}, CRO`}>
              <ReportBtn className={styles.reportBtn} />
            </ReportModalTrigger>
          </div>
        )}
      </div>
      {!!notificationRegistryData.length && (
        <Notifications
          officialsId={officialsId}
          notificationRegistryData={notificationRegistryData}
          toggleShowAll={toggleShowAll}
          showAll={showAll}
          notificationsCount={notificationsCount}
        />
      )}
      {!notificationRegistryData.length && <NoData />}
    </div>
  )
}

export default NotificationsWidget
