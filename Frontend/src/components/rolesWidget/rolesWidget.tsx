import * as React from 'react'
import classnames from 'classnames'
import NoData from 'components/emptyStates/noData/noData'
import { ReactComponent as LinkBtn } from 'assets/images/link.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import { DEFAULT_ROLES_LIMIT } from 'constants/constants'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import ExplanationModal from 'components/explanationModal/explanationModal'

import styles from './rolesWidget.module.scss'

interface TableRowProps {
  name: string
  from: string
  value: string
}

const TableRow: React.FC<TableRowProps> = props => {
  return (
    <React.Fragment>
      <div className={styles.tableRow}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.valueWrapper}>
          <div className={styles.value}>{props.value}</div>
          {props.from && <div className={styles.from}>od {props.from}</div>}
        </div>
      </div>
    </React.Fragment>
  )
}

interface RolesProps {
  rolesGroups: Array<{
    year: number
    items: Array<{
      role: string
      dateFrom: string
      organisation: string
    }>
  }>
  showAll: boolean
  rolesCount: number
  toggleShowAllRoles: () => void
}

const Roles: React.FC<RolesProps> = ({ rolesGroups, showAll, rolesCount, toggleShowAllRoles }) => {
  const hasMore = rolesCount > DEFAULT_ROLES_LIMIT
  return (
    <React.Fragment>
      {rolesGroups.map((group, index) => {
        return (
          <div className={styles.tableSection} key={index}>
            <div className={styles.subtitleWrapper}>
              <h3 className={styles.subtitle}>{group.year === 9999 ? 'Dosud' : `Do ${group.year}`}</h3>
              <div className={styles.line} />
            </div>
            {group.items.map((item, index) => (
              <TableRow name={item.role} from={item.dateFrom} value={item.organisation} key={index} />
            ))}
          </div>
        )
      })}
      {hasMore && (
        <div className={styles.showMore} onClick={toggleShowAllRoles}>
          {!showAll && hasMore && (
            <div className={styles.more}>Zobrazit {rolesCount - DEFAULT_ROLES_LIMIT} dalších</div>
          )}
          {showAll && <div className={styles.less}>Zobrazit méně</div>}
        </div>
      )}
    </React.Fragment>
  )
}

interface Props extends RolesProps {
  fullname: string
  source: string
}

const RolesWidget: React.FC<Props> = ({ rolesGroups, showAll, toggleShowAllRoles, rolesCount, fullname, source }) => {
  const rolesWidgetCustomClassNames = classnames(
    styles.widget,
    styles.widgetWithTable,
    styles.roles,
    !rolesGroups.length && styles.noData,
  )

  return (
    <div className={rolesWidgetCustomClassNames}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Role</h2>
          <ExplanationModal title="Role">
            <React.Fragment>
              Politik/politička za svou kariéru vystřídá velkou řádku rolí. A ty nejdůležitější by měly být přímo tady.
              Kterými stranami prošel, jestli byl jen řadovým politikem nebo se dostal výš, nebo zda byl aktivním
              politikem před rokem 1989.
              <br />
              Tyto informace sbíráme ručně, proto Vás žádáme o shovívavost, pokud nám nějaká unikne. Právě proto tu máme
              ikonku vlaječky, díky které nám případnou nepřesnost můžete nahlásit a my budeme informaci fact-checkovat
              dále.
            </React.Fragment>
          </ExplanationModal>
        </div>
        <div className={styles.tags}>
          <div className={styles.tag}>
            <LinkBtn />
            <div className={styles.tagname}>
              <a href={source} rel="noopener noreferrer" target="_blank">
                hlidacstatu.cz
              </a>
            </div>
          </div>
          <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${fullname}, role`}>
            <ReportBtn className={styles.reportBtn} />
          </ReportModalTrigger>
        </div>
      </div>
      {!!rolesGroups.length && (
        <Roles
          rolesGroups={rolesGroups}
          showAll={showAll}
          rolesCount={rolesCount}
          toggleShowAllRoles={toggleShowAllRoles}
        />
      )}
      {!rolesGroups.length && <NoData />}
    </div>
  )
}

export default RolesWidget
