import React, { Fragment } from 'react'
import classnames from 'classnames'
import styles from './detail.module.scss'
import { DetailSections } from '../../store/detail/types'

type Props = {
  visibleSection: DetailSections | null
  onOverviewClick: () => void
  onCareerClick: () => void
  onEngagementClick: () => void
  onMediaClick: () => void
}

export function MenuBar({ visibleSection, onCareerClick, onEngagementClick, onMediaClick, onOverviewClick }: Props) {
  return (
    <Fragment>
      <div
        className={classnames(styles.link, visibleSection === DetailSections.OVERVIEW ? styles.selected : '')}
        onClick={onOverviewClick}
      >
        Přehled
      </div>
      <div
        className={classnames(styles.link, visibleSection === DetailSections.CAREER ? styles.selected : '')}
        onClick={onCareerClick}
      >
        Kariéra politika
      </div>
      <div
        className={classnames(styles.link, visibleSection === DetailSections.ENGAGEMENT ? styles.selected : '')}
        onClick={onEngagementClick}
      >
        Angažovanost
      </div>
      <div
        className={classnames(styles.link, visibleSection === DetailSections.MEDIA ? styles.selected : '')}
        onClick={onMediaClick}
      >
        Mediální obraz
      </div>
    </Fragment>
  )
}
