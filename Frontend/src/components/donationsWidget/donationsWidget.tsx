import * as React from 'react'
import classnames from 'classnames'
import ZeroValue from 'components/emptyStates/zeroValue/zeroValue'
import { ReactComponent as LinkBtn } from 'assets/images/link.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import { DEFAULT_DONATIONS_LIMIT } from 'constants/constants'
import ExplanationModal from 'components/explanationModal/explanationModal'

import styles from './donationsWidget.module.scss'

interface TableRowProps {
  value: number
  name: string
}

const TableRow: React.FC<TableRowProps> = props => {
  const donation = props.value
  return (
    <React.Fragment>
      <div className={styles.tableRow}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.value}>
          {Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(donation)}
        </div>
      </div>
    </React.Fragment>
  )
}

interface DonationsProps {
  donationsGroups: Array<{
    year: number
    items: Array<{
      party: string
      donatedAmount: number
    }>
  }>
  showAll: boolean
  toggleShowAll: () => void
  donationsCount: number
}

const Donations: React.FC<DonationsProps> = ({ donationsGroups, toggleShowAll, showAll, donationsCount }) => {
  const hasMore = donationsCount > DEFAULT_DONATIONS_LIMIT
  return (
    <React.Fragment>
      {donationsGroups &&
        donationsGroups.map((group, index) => {
          return (
            <div className={styles.tableSection} key={index}>
              <div className={styles.subtitleWrapper}>
                <h3 className={styles.subtitle}>{group.year}</h3>
                <div className={styles.line} />
              </div>
              {group.items.map((item, index) => (
                <TableRow name={item.party} value={item.donatedAmount} key={index} />
              ))}
            </div>
          )
        })}
      {hasMore && (
        <div className={styles.showMore} onClick={toggleShowAll}>
          {!showAll && <div className={styles.more}>Zobrazit {donationsCount - DEFAULT_DONATIONS_LIMIT} dalších</div>}
          {showAll && <div className={styles.less}>Zobrazit méně</div>}
        </div>
      )}
    </React.Fragment>
  )
}

interface Props extends DonationsProps {
  fullname: string
}

const DonationsWidget: React.FC<Props> = ({ donationsGroups, showAll, toggleShowAll, donationsCount, fullname }) => {
  const donationWidgetCustomClassNames = classnames(styles.widget, styles.widgetWithTable)

  return (
    <div className={donationWidgetCustomClassNames}>
      <div className={styles.header}>
        <div className={styles.headerTitleWrapper}>
          <h2 className={styles.title}>Sponzorství</h2>
          <ExplanationModal title="Sponzorství">
            Politika není jenom o tom, kdo sponzoruje politika/političku, ale také o tom, koho sponzoruje
            politik/politička. Zde můžete vidět, kolik komu daná osoba darovala a jaké politické subjekty finančně
            podporovala či stále podporuje.
          </ExplanationModal>
        </div>
        {!!donationsGroups.length && (
          <div className={styles.tags}>
            <div className={styles.tag}>
              <LinkBtn />
              <div className={styles.tagname}>
                <a href="https://www.hlidacstatu.cz/" rel="noopener noreferrer" target="_blank">
                  hlidacstatu.cz
                </a>
              </div>
            </div>
            <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${fullname}, sponzorstvi`}>
              <ReportBtn className={styles.reportBtn} />
            </ReportModalTrigger>
          </div>
        )}
      </div>
      {!!donationsGroups.length && (
        <Donations
          donationsGroups={donationsGroups}
          showAll={showAll}
          toggleShowAll={toggleShowAll}
          donationsCount={donationsCount}
        />
      )}
      {!donationsGroups.length && <ZeroValue title="Politik dosud neposkytl sponzorský dar" />}
    </div>
  )
}

export default DonationsWidget
