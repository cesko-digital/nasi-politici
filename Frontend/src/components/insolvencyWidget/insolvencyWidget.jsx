import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import NoData from '../../components/emptyStates/noData/noData'
import ZeroValue from '../../components/emptyStates/zeroValue/zeroValue'
import { ReactComponent as LinkBtn } from '../../assets/images/link.svg';
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {createStructuredSelector} from 'reselect'
import {
  getPersonalInsolvency,
	getCompanyInsolvency,
	getFullName,
  hasInsolvency,
  hasInsolvencyData,
} from '../../redux/selectors'

import styles from './insolvencyWidget.module.scss'
import ReportModalTrigger from '../reportModal/reportModalTrigger'



function InsolvencyRow({title, personalCount, companyCount}) {
  return (
    <div>
      <div className={styles.subtitleWrapper}>
        <h3 className={styles.subtitle}>je {title}</h3>
        <div className={styles.line} />
      </div>
      <div>
        <div className={styles.tableRow}>
          <div>jako fyzická osoba</div>
          <div>{personalCount}</div>
        </div>
        <div className={styles.tableRow}>
          <div>skrz právnickou osobu</div>
          <div>{companyCount}</div>
        </div>
      </div>
    </div>
  )
}

const InsolvencyWidget = ({personalInsolvency, companyInsolvency, fullname, hasInsolvency, hasInsolvencyData}) => {
  const insolvencyWidgetCustomClassNames = classnames(
    styles.widget,
    styles.widgetWithTable,
    styles.insolvency,
    !hasInsolvencyData && styles.noData)

  return (
    <div className={insolvencyWidgetCustomClassNames}>
      <div className={styles.header}>
        <h2 className={styles.title}>Insolvence</h2>
        {hasInsolvencyData && <div className={styles.tags}>
          <div className={styles.tag}>
            <LinkBtn />
            <div className={styles.tagname}>
              <a href='https://www.hlidacstatu.cz/' rel="noopener noreferrer" target='_blank'>hlidacstatu.cz</a>
            </div>
          </div>
          <ReportModalTrigger
						className={styles.reportBtnWrapper}
						modalTitle={`${fullname}, insolvence`}
					>
            <ReportBtn className={styles.reportBtn}/>
          </ReportModalTrigger>
        </div>}
      </div>
      {!hasInsolvencyData && <NoData />}
      {hasInsolvencyData && !hasInsolvency &&
        <ZeroValue title='Politik dosud není věřitelem, ani dlužníkem'/>}
      {!!hasInsolvency &&
        <React.Fragment>
          <InsolvencyRow title='věřitelem' personalCount={personalInsolvency.creditorCount} companyCount={companyInsolvency.creditorCount}/>
          <InsolvencyRow title='dlužníkem' personalCount={personalInsolvency.debtorCount} companyCount={companyInsolvency.debtorCount}/>
          <InsolvencyRow title='insolvenčním správcem' personalCount={personalInsolvency.bailiffCount} companyCount={companyInsolvency.bailiffCount}/>
        </React.Fragment>}
    </div>
  )
}

const mapStateToProps = createStructuredSelector(
  {
    hasInsolvencyData: hasInsolvencyData,
    hasInsolvency: hasInsolvency,
    personalInsolvency: getPersonalInsolvency,
		companyInsolvency: getCompanyInsolvency,
		fullname: getFullName,
  }
)

export default connect(mapStateToProps)(InsolvencyWidget);
