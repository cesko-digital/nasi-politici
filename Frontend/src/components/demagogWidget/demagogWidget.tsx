import * as React from 'react'
import classnames from 'classnames'
import NoData from 'components/emptyStates/noData/noData'
import { ReactComponent as Tick } from 'assets/images/dem-tick.svg'
import { ReactComponent as Cross } from 'assets/images/dem-cross.svg'
import { ReactComponent as Exclamation } from 'assets/images/dem-exclamation.svg'
import { ReactComponent as Question } from 'assets/images/dem-question.svg'
import { ReactComponent as LinkBtn } from 'assets/images/link.svg'
import { ReactComponent as RedirectBtn } from 'assets/images/redirect.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import { dummyPluralize as pluralize } from 'utils/string'

import styles from './demagogWidget.module.scss'
import Row from './demagogWidgetRow'

interface Props {
  data: {
    count: number
    id: string
    misleading: number
    misleadingPerc: number
    true: number
    truePerc: number
    untrue: number
    untruePerc: number
    unverifiable: number
    unverifiablePerc: number
  }
  fullname: string
}

const DemagogWidget: React.FC<Props> = ({ data, fullname }) => {
  const demagogWidgetCustomClassNames = classnames(styles.widget, !data.id && styles.noData)

  return (
    <div className={demagogWidgetCustomClassNames}>
      <div className={styles.header}>
        <h2 className={styles.title}>Výroky</h2>
        {!!data.id && (
          <div className={styles.tags}>
            <div className={styles.tag}>
              <LinkBtn />
              <div className={styles.tagname}>
                <a href="https://demagog.cz/" rel="noopener noreferrer" target="_blank">
                  demagog.cz
                </a>
              </div>
            </div>
            <ReportModalTrigger className={styles.reportBtnWrapper} modalTitle={`${fullname}, výroky`}>
              <ReportBtn className={styles.reportBtn} />
            </ReportModalTrigger>
          </div>
        )}
      </div>
      {!!data.id && (
        <React.Fragment>
          <div className={styles.sum}>
            Politik má celkem {data.count}{' '}
            {pluralize(data.count, 'hodnocený výrok', 'hodnocené výroky', 'hodnocených výroků')}, z toho je:
          </div>
          <div className={styles.stats}>
            <div className={styles.itemsWrapper}>
              <div className={styles.true}>
                <Row
                  value={data.true}
                  valuePerc={data.truePerc}
                  iconComponent={Tick}
                  titleForms={['pravdivý', 'pravdivé', 'pravdivých']}
                />
              </div>
              <div className={styles.untrue}>
                <Row
                  value={data.untrue}
                  valuePerc={data.untruePerc}
                  iconComponent={Cross}
                  titleForms={['nepravdivý', 'nepravdivé', 'nepravdivých']}
                />
              </div>
              <div className={styles.misleading}>
                <Row
                  value={data.misleading}
                  valuePerc={data.misleadingPerc}
                  iconComponent={Exclamation}
                  titleForms={['zavádějící', 'zavádějící', 'zavádějících']}
                />
              </div>
              <div className={styles.unverifiable}>
                <Row
                  value={data.unverifiable}
                  valuePerc={data.unverifiablePerc}
                  iconComponent={Question}
                  titleForms={['neověřitelný', 'neověřitelné', 'neověřitelných']}
                />
              </div>
            </div>
          </div>
          <div className={styles.linkWrapper}>
            <a
              className={styles.link}
              href={`https://demagog.cz/politici/${data.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Zdůvodnění hodnocení zde
            </a>
            <RedirectBtn className={styles.redirectBtn} />
          </div>
        </React.Fragment>
      )}

      {!data.id && <NoData />}
    </div>
  )
}
export default DemagogWidget
