import * as React from 'react'
import classnames from 'classnames'
import NoData from 'components/emptyStates/noData/noData'
import ZeroValue from 'components/emptyStates/zeroValue/zeroValue'
import { ReactComponent as LinkBtn } from 'assets/images/link.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import ExplanationModal from 'components/explanationModal/explanationModal'
import { dummyPluralize as pluralize } from 'utils/string'

import styles from './insolvencyWidget.module.scss'

interface RowProps {
  title: string
  personalCount: number
  companyCount: number
}

const InsolvencyRow: React.FC<RowProps> = ({ title, personalCount, companyCount }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.subtitleWrapper}>
        <h3 className={styles.subtitle}>je {title}</h3>
        <div className={styles.line} />
      </div>
      <div>
        <div className={styles.tableRow}>
          <div>jako fyzická osoba</div>
          <div>
            {personalCount} {pluralize(personalCount, 'případ', 'případy', 'případů')}
          </div>
        </div>
        <div className={styles.tableRow}>
          <div>skrz právnickou osobu</div>
          <div>
            {companyCount} {pluralize(companyCount, 'případ', 'případy', 'případů')}
          </div>
        </div>
      </div>
    </div>
  )
}

interface InsolvencyData {
  bailiffCount: number
  bailiffLink: string
  creditorCount: number
  creditorLink: string
  debtorCount: number
  debtorLink: string
}

interface Props {
  companyInsolvency: InsolvencyData
  fullname: string
  source: string
  hasInsolvency: boolean
  hasInsolvencyData: boolean
  personalInsolvency: InsolvencyData
}

const InsolvencyWidget: React.FC<Props> = ({
  personalInsolvency,
  companyInsolvency,
  fullname,
  source,
  hasInsolvency,
  hasInsolvencyData,
}) => {
  const insolvencyWidgetCustomClassNames = classnames(
    styles.widget,
    styles.widgetWithTable,
    styles.insolvency,
    !hasInsolvencyData && styles.noData,
  )

  return (
    <div className={insolvencyWidgetCustomClassNames}>
      <div className={styles.header}>
        <div className={styles.headerTitleWrapper}>
          <h2 className={styles.title}>Insolvence</h2>
          <ExplanationModal title="Insolvence">
            Ne všechno se vždycky daří podle představ a někdy to znamená být v červených číslech. Jenomže veřejně činná
            osoba by mohla být kvůli podobným peripetiím vydíratelná. A pokud se tato osoba nebo na ni napojené firmy
            nachází v insolvenci, mohl by mít nejenom motivaci ideovou, ale i finanční, rozhodovat se určitým způsobem.
            A to ať už přímo či nepřímo. Proto se v téhle škatulce můžete přesvědčit, jak to s ní doopravdy je.
          </ExplanationModal>
        </div>
        {hasInsolvencyData && (
          <div className={styles.tags}>
            <div className={styles.tag}>
              <LinkBtn />
              <div className={styles.tagname}>
                <a href={source} rel="noopener noreferrer" target="_blank">
                  hlidacstatu.cz
                </a>
              </div>
            </div>
            <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${fullname}, insolvence`}>
              <ReportBtn className={styles.reportBtn} />
            </ReportModalTrigger>
          </div>
        )}
      </div>
      {!hasInsolvencyData && <NoData />}
      {hasInsolvencyData && !hasInsolvency && <ZeroValue title="Politik není věřitelem ani dlužníkem" />}
      {!!hasInsolvency && (
        <React.Fragment>
          <InsolvencyRow
            title="věřitelem"
            personalCount={personalInsolvency.creditorCount}
            companyCount={companyInsolvency.creditorCount}
          />
          <InsolvencyRow
            title="dlužníkem"
            personalCount={personalInsolvency.debtorCount}
            companyCount={companyInsolvency.debtorCount}
          />
          <InsolvencyRow
            title="insolvenčním správcem"
            personalCount={personalInsolvency.bailiffCount}
            companyCount={companyInsolvency.bailiffCount}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default InsolvencyWidget
