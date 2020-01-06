
import React from 'react'
import classnames from 'classnames'
import NoData from '../../components/emptyStates/noData/noData'
import { ReactComponent as LinkBtn } from '../../assets/images/link.svg';
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {DEFAULT_ROLES_LIMIT} from '../../constants'
import ReportModalTrigger from '../reportModal/reportModalTriggerConnected'

import styles from './rolesWidget.module.scss'

const TableRow = (props) => {
  return (
    <React.Fragment>
      <div className={styles.tableRow}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.value}>{props.value}</div>
      </div>
    </React.Fragment>
  )
}

const Roles = ({rolesGroups, showAll, rolesCount, toggleShowAllRoles}) => {
	const hasMore = rolesCount > DEFAULT_ROLES_LIMIT
  return (
    <React.Fragment>
        {rolesGroups.map((group, index) => {
          return (
            <div className={styles.tableSection} key={index}>
              <div className={styles.subtitleWrapper}>
                <h3 className={styles.subtitle}>{group.year === 9999 ? 'Dosud' : group.year}</h3>
                <div className={styles.line} />
              </div>
              {group.items.map((item, index) => <TableRow name={item.role} value={item.organisation} key={index}/>)}
            </div>
          )
        })}
        {hasMore && <div className={styles.showMore} onClick={toggleShowAllRoles}>
          {!showAll && hasMore && <div className={styles.more}>Zobrazit {rolesCount-DEFAULT_ROLES_LIMIT} dalších</div>}
          {showAll && <div className={styles.less}>Zobrazit méně</div>}
        </div>}
    </React.Fragment>
  )
}

export default ({rolesGroups, showAll, toggleShowAllRoles, rolesCount, fullname}) => {
  const rolesWidgetCustomClassNames = classnames(
    styles.widget,
    styles.widgetWithTable,
    styles.roles,
    !rolesGroups.length && styles.noData)

  return (
    <div className={rolesWidgetCustomClassNames}>
      <div className={styles.header}>
        <h2 className={styles.title}>Role</h2>
        <div className={styles.tags}>
          <div className={styles.tag}>
            <LinkBtn />
            <div className={styles.tagname}>
              <a href='https://www.hlidacstatu.cz/' rel="noopener noreferrer" target='_blank'>hlidacstatu.cz</a>
            </div>
          </div>
          <ReportModalTrigger
						className={styles.reportBtnWrapper}
						modalTitle={`${fullname}, role`}
					>
            <ReportBtn className={styles.reportBtn}/>
          </ReportModalTrigger>
        </div>
      </div>
      {!!rolesGroups.length && <Roles
        rolesGroups={rolesGroups}
        showAll={showAll}
        rolesCount={rolesCount}
        toggleShowAllRoles={toggleShowAllRoles}
      />}
      {!rolesGroups.length && <NoData />}
    </div>
  );
}
