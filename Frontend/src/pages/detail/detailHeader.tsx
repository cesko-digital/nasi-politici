import React, { Fragment, Ref } from 'react'
import classnames from 'classnames'
import styles from './detail.module.scss'
import { Detail } from '../../store/detail/types'
import ProfilePicture from '../../components/profilePicture/profilePicture'
import { dummyFormatDateShort, getYear } from '../../utils/date'
import { ReactComponent as CrossIcon } from '../../assets/images/cross.svg'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import { getFullNameString } from '../../store/detail/selectors'

type Props = {
  detail: Detail
}

export const DetailHeader = React.forwardRef(({ detail }: Props, ref: Ref<HTMLDivElement>) => {
  const { deathDate, photo, birthDate, currentParty, lastManualUpdate } = detail
  const fullName = getFullNameString(detail)

  return (
    <div className={styles.heading} ref={ref}>
      <div className={styles.wrapper}>
        <ProfilePicture
          src={photo}
          name={fullName}
          customClassName={classnames(styles.photo, { [styles.photoDeath]: deathDate })}
        />
        <div className={styles.initials}>
          <div className={styles.initialsWrapper}>
            <div className={classnames(styles.fullname, { [styles.fulnameDeath]: deathDate })}>{fullName}</div>
            <div className={styles.additionalWrapper}>
              <div className={styles.personal}>
                {birthDate && (
                  <div className={styles.birthYear}>
                    *{getYear(birthDate)}
                    {deathDate && (
                      <Fragment>
                        &nbsp;- <CrossIcon className={styles.crossIcon} /> {getYear(deathDate)}
                      </Fragment>
                    )}
                  </div>
                )}
                {currentParty && (
                  <>
                    <div className={styles.divider} />
                    <div className={styles.currentParty}>{currentParty}</div>
                  </>
                )}
              </div>
              <div className={styles.lastUpdateWrapper}>
                <div className={styles.divider} />
                <div className={styles.lastUpdate}>
                  {lastManualUpdate ? (
                    <div className={styles.lastUpdateLabel}>
                      Zkontrolováno {dummyFormatDateShort(new Date(detail.lastManualUpdate))}
                    </div>
                  ) : (
                    <div className={styles.lastUpdateEmpty}>Čeká na kontrolu</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.shareWrapper}>
            <div className={styles.shareText}>Sdílet</div>
            <FacebookShareButton className={styles.shareBtn} url={window.location.href}>
              <FacebookIcon round size={30} />
            </FacebookShareButton>
            <TwitterShareButton className={styles.shareBtn} url={window.location.href}>
              <TwitterIcon round size={30} />
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </div>
  )
})
