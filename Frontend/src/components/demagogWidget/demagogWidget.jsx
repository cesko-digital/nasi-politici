import React from 'react'
import classnames from 'classnames'
import NoData from '../../components/emptyStates/noData/noData'
import { ReactComponent as Tick } from '../../assets/images/dem-tick.svg';
import { ReactComponent as Cross } from '../../assets/images/dem-cross.svg';
import { ReactComponent as Exclamation } from '../../assets/images/dem-exclamation.svg';
import { ReactComponent as Question } from '../../assets/images/dem-question.svg';
import { ReactComponent as LinkBtn } from '../../assets/images/link.svg';
import { ReactComponent as RedirectBtn } from '../../assets/images/redirect.svg';
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import ReportModalTrigger from '../reportModal/reportModalTriggerConnected'

import styles from './demagogWidget.module.scss'


export default ({data, fullname}) => {
  const demagogWidgetCustomClassNames = classnames(styles.widget, !data.count && styles.noData)

  return (
		<div className={demagogWidgetCustomClassNames}>
			<div className={styles.header}>
				<h2 className={styles.title}>Výroky</h2>
				{!!data.id && <div className={styles.tags}>
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
			{!!data.id && <React.Fragment>
				<div className={styles.sum}>Politik má celkem {data.count} hodnocených výroků, z toho je:</div>
				<div className={styles.stats}>
					<div className={styles.itemsWrapper}>
						<div className={styles.true}>
							<div className={styles.percBar} style={{width: `${data.truePerc}%`}} />
							<div className={styles.count}>
								<div className={styles.number}><Tick className={styles.icon}/>{data.true} pravdivých</div> <div className={styles.percent}>{data.truePerc}%</div></div>
							</div>
						<div className={styles.untrue}>
							<div className={styles.percBar} style={{width: `${data.untruePerc}%`}} />
							<div className={styles.count}>
								<div className={styles.number}><Cross className={styles.icon}/>{data.untrue} nepravdivých</div> <div className={styles.percent}>{data.untruePerc}%</div></div>
							</div>
						<div className={styles.misleading}>
						<div className={styles.percBar} style={{width: `${data.misleadingPerc}%`}} />
							<div className={styles.count}>
								<div className={styles.number}><Exclamation className={styles.icon}/>{data.misleading} zavádějících</div> <div className={styles.percent}>{data.misleadingPerc}%</div></div>
							</div>
						<div className={styles.unverifiable}>
						<div className={styles.percBar} style={{width: `${data.unverifiablePerc}%`}} />
							<div className={styles.count}>
								<div className={styles.number}><Question className={styles.icon}/>{data.unverifiable} neověřitelných</div> <div className={styles.percent}>{data.unverifiablePerc}%</div></div>
							</div>
					</div>
				</div>
				<div className={styles.linkWrapper}>
					<a className={styles.link} href={`https://demagog.cz/politici/${data.id}`} rel="noopener noreferrer" target='_blank'>Přejít na Demagog.cz</a>
          <RedirectBtn className={styles.redirectBtn}/>
				</div>
			</React.Fragment>}

			{!data.count && <NoData />}
		</div>
  );
}
