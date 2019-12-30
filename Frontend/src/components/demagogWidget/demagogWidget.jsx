import React from 'react'
import {createStructuredSelector} from 'reselect'
import { connect } from 'react-redux'
import classnames from 'classnames'
import NoData from '../../components/emptyStates/noData/noData'
import { ReactComponent as LinkBtn } from '../../assets/images/link.svg';
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {getDemagogData, getFullName} from '../../redux/selectors'
import ReportModalTrigger from '../reportModal/reportModalTrigger'

import styles from './demagogWidget.module.scss'


const DemagogWidget = ({data, fullname}) => {
  const demagogWidgetCustomClassNames = classnames(styles.widget, !data.count && styles.noData)

  return (
		<div className={demagogWidgetCustomClassNames}>
			<div className={styles.header}>
				<h2 className={styles.title}>Výroky</h2>
				{!!data.count && <div className={styles.tags}>
					<div className={styles.tag}>
						<LinkBtn />
						<div className={styles.tagname}>
							<a href='https://demagog.cz/' rel="noopener noreferrer" target='_blank'>demagog.cz</a>
						</div>
					</div>
					<ReportModalTrigger
						className={styles.reportBtnWrapper}
						modalTitle={`${fullname}, výroky`}
					>
						<ReportBtn className={styles.reportBtn}/>
					</ReportModalTrigger>
				</div>}
			</div>
			{!!data.count && <div className={styles.stats}>
				<div className={styles.sum}>Politik má celkem {data.count} hodnocených výroků, z toho je:</div>
				<div className={styles.itemsWrapper}>
					<div className={styles.true}>
						<div className={styles.percBar} style={{width: `${data.truePerc}%`}} />
						<div className={styles.count}>
							<div>{data.true} pravdivých</div> <div className={styles.percent}>{data.truePerc}%</div></div>
						</div>
					<div className={styles.untrue}>
						<div className={styles.percBar} style={{width: `${data.untruePerc}%`}} />
						<div className={styles.count}>
							<div>{data.untrue} nepravdivých</div> <div className={styles.percent}>{data.untruePerc}%</div></div>
						</div>
					<div className={styles.misleading}>
					<div className={styles.percBar} style={{width: `${data.misleadingPerc}%`}} />
						<div className={styles.count}>
							<div>{data.misleading} zavádějících</div> <div className={styles.percent}>{data.misleadingPerc}%</div></div>
						</div>
					<div className={styles.unverifiable}>
					<div className={styles.percBar} style={{width: `${data.unverifiablePerc}%`}} />
						<div className={styles.count}>
							<div>{data.unverifiable} neověřitelných</div> <div className={styles.percent}>{data.unverifiablePerc}%</div></div>
						</div>
				</div>
			</div>}

			{!data.count && <NoData />}
		</div>
  );
}

const mapStateToProps = createStructuredSelector({
	data: getDemagogData,
	fullname: getFullName,
})

export default connect(mapStateToProps)(DemagogWidget);
