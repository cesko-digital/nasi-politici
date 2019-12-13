
import React from 'react'
import {createStructuredSelector} from 'reselect'
import { connect } from 'react-redux'
import classnames from 'classnames'
import {getDonations, getShowAllDonations, getDonationsCount} from '../../redux/selectors'
import {toggleShowAllDonations} from '../../redux/actions'
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {DEFAULT_DONATIONS_LIMIT} from '../../constants'

import styles from './donationsWidget.module.scss'

const EmptyState = () => {
  return (<div>Empty</div>)
}

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


const Donations = ({donationsGroups, toggleShowAll, showAll, donationsCount}) => {
  return (
    <React.Fragment>
      {donationsGroups && donationsGroups.map((group, index) => {
        return (
          <div className={styles.tableSection} key={index}>
            <h3 className={styles.subtitle}>{group.year}</h3>
            {group.items.map((item, index) => <TableRow name={item.party} value={item.donatedAmount} key={index} />)}
          </div>
        )
      })}
      <div onClick={toggleShowAll}>
        {!showAll && <div className={styles.more}>Zobrazit {donationsCount-DEFAULT_DONATIONS_LIMIT} dalších</div>}
        {showAll && <div className={styles.more}>Zobrazit méně</div>}
      </div>
    </React.Fragment>
  )
}
const DonationsWidget = ({donationsGroups, showAll, toggleShowAllDonations, donationsCount}) => {

  return (
    <div className={classnames(styles.widget, styles.widgetWithTable)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sponzorství</h2>
        <div>
          {/* <div></div> TODO: tagy */}
          <ReportBtn />
        </div>
      </div>
      {donationsGroups.length > 0 && <Donations
        donationsGroups={donationsGroups}
        showAll={showAll}
        toggleShowAll={toggleShowAllDonations}
        donationsCount={donationsCount}
      />}
      {!donationsGroups.length && <EmptyState />}
		</div>
  );
}

const mapStateToProps = createStructuredSelector({
  donationsGroups: getDonations,
  showAll: getShowAllDonations,
  donationsCount: getDonationsCount,
})

export default connect(mapStateToProps, {toggleShowAllDonations})(DonationsWidget);
