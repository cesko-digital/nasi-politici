import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {createStructuredSelector} from 'reselect'
import {
  getPersonalInsolvency,
  getCompanyInsolvency,
} from '../../redux/selectors'

import styles from './insolvencyWidget.module.scss'


function InsolvencyRow({title, personalCount, companyCount}) {
  return (
    <div>
      <h3 className={styles.subtitle}>je {title}</h3>
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

const InsolvencyWidget = ({personalInsolvency, companyInsolvency}) => {
  return (
    <div className={classnames(styles.widget, styles.widgetWithTable, styles.insolvency)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Insolvence</h2>
        <div>
          {/* <div></div> TODO: tagy */}
          <ReportBtn />
        </div>
      </div>
      {personalInsolvency && companyInsolvency &&
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
    personalInsolvency: getPersonalInsolvency,
    companyInsolvency: getCompanyInsolvency,
  }
)

export default connect(mapStateToProps)(InsolvencyWidget);
