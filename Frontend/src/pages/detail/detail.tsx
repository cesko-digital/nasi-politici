import * as React from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import ScrollIntoView from 'react-scroll-into-view'
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import { ReactComponent as Divider } from 'assets/images/detailDivider.svg'
import NoData from 'components/emptyStates/noData/noData'
import LoadingBar from 'components/loadingBar/loadingBar'
import NewsWidget from 'components/newsWidget/newsWidgetConnected'
import DonationsWidget from 'components/donationsWidget/donationsWidgetConnected'
import RolesWidget from 'components/rolesWidget/rolesWidgetConnected'
import NotificationsWidget from 'components/notificationsWidget/notificationsWidgetConnected'
import InsolvencyWidget from 'components/insolvencyWidget/insolvencyWidgetConnected'
import DemagogWidget from 'components/demagogWidget/demagogWidgetConnected'
import ContactsWidget from 'components/contactsWidget/contactsWidgetConnected'
import ProfilePicture from 'components/profilePicture/profilePicture'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import Error from 'pages/error/error'
import EngagementChart from 'components/engagementChart/engagementChartConnected'

import styles from './detail.module.scss'

interface Props {
  birthYear: string
  deathYear: string
  contact: string
  currentParty: string
  description: string
  engagement: string
  fullname: string
  isLoading: boolean
  lastUpdate: string | null
  loadDetail: (id: string) => void
  match: {
    params: {
      id: string
    }
  }
  photoUrl: string
  isValid?: boolean
}

const MenuBar: React.FC = () => {
  return (
    <React.Fragment>
      <ScrollIntoView selector="#overview" smooth>
        <div className={styles.link}>Přehled</div>
      </ScrollIntoView>
      <ScrollIntoView selector="#career" smooth>
        <div className={styles.link}>Kariéra politika</div>
      </ScrollIntoView>
      <ScrollIntoView selector="#engagement" smooth>
        <div className={styles.link}>Angažovanost</div>
      </ScrollIntoView>
      <ScrollIntoView selector="#media" smooth>
        <div className={styles.link}>Mediální obraz</div>
      </ScrollIntoView>
    </React.Fragment>
  )
}

const Detail: React.FC<Props> = props => {
  const {
    loadDetail,
    match: {
      params: { id },
    },
  } = props
  React.useEffect(() => {
    loadDetail(id)
  }, [loadDetail, id])
  React.useEffect(() => {
    window.scrollTo({
      top: document.body.scrollTop,
    })
  })

  const aboutWidgetCustomClassNames = classnames(styles.widget, !props.description && styles.noData)
  return (
    <div className={styles.detail}>
      {props.isLoading && <LoadingBar />}
      {!props.isLoading && !props.isValid && <Error />}
      {!props.isLoading && props.isValid && (
        <React.Fragment>
          <Helmet>
            <title>{props.fullname} | Naši Politici</title>
          </Helmet>
          <div className={styles.heading}>
            <div className={styles.wrapper}>
              <ProfilePicture
                src={props.photoUrl}
                name={props.fullname}
                customClassName={classnames(styles.photo, { [styles.photoDeath]: props.deathYear })}
              />
              <div className={styles.initials}>
                <div className={styles.initialsWrapper}>
                  <div className={classnames(styles.fullname, { [styles.fulnameDeath]: props.deathYear })}>
                    {props.fullname}
                  </div>
                  <div className={styles.additionalWrapper}>
                    <div className={styles.personal}>
                      {props.birthYear && (
                        <div className={styles.birthYear}>
                          *{props.birthYear}
                          {props.deathYear && (
                            <React.Fragment>
                              &nbsp;- <CrossIcon className={styles.crossIcon} /> {props.deathYear}
                            </React.Fragment>
                          )}
                        </div>
                      )}
                      {props.currentParty && (
                        <>
                          <div className={styles.divider}></div>
                          <div className={styles.currentParty}>{props.currentParty}</div>
                        </>
                      )}
                    </div>
                    <div className={styles.lastUpdateWrapper}>
                      <div className={styles.divider}></div>
                      <div className={styles.lastUpdate}>
                        {props.lastUpdate && (
                          <React.Fragment>
                            <div className={styles.lastUpdateLabel}>Zkontrolováno&nbsp;</div>
                            <div className={styles.lastUpdateLabelShort}>Zkont.&nbsp;</div>
                            &nbsp;{props.lastUpdate}
                          </React.Fragment>
                        )}
                        {!props.lastUpdate && <div className={styles.lastUpdateLabel}>Čeká na kontrolu</div>}
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
          <div className={styles.body}>
            <div className={styles.menuWrapper}>
              <div className={styles.menu}>
                <MenuBar />
              </div>
            </div>
            <div className={styles.detail}>
              <div id="overview" className={classnames(styles.section, styles.overview)}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Přehled</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <div className={styles.widgets}>
                  <div className={aboutWidgetCustomClassNames}>
                    <div className={styles.header}>
                      <h2 className={styles.title}>Ve Zkratce</h2>
                      {!!props.description && (
                        <div className={styles.tags}>
                          <ReportModalTrigger
                            className={styles.reportBtnWrapper}
                            modalTitle={`${props.fullname}, ve zkratce`}
                          >
                            <ReportBtn className={styles.reportBtn} />
                          </ReportModalTrigger>
                        </div>
                      )}
                    </div>
                    {!props.description && <NoData />}
                    {!!props.description && <div className={styles.description}>{props.description}</div>}
                  </div>
                  <ContactsWidget />
                  <DemagogWidget />
                </div>
              </div>
              <div id="career" className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Kariéra</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <div className={styles.widgets}>
                  <RolesWidget />
                  <InsolvencyWidget />
                  <DonationsWidget />
                  <NotificationsWidget />
                </div>
              </div>
              <div id="engagement" className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Angažovanost</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <EngagementChart />
              </div>
              <div id="media" className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Mediální obraz</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <div className={classnames(styles.widgets, styles.news)}>
                  <NewsWidget />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Detail
