import classnames from 'classnames'
import React, { Fragment, useState, useEffect, useRef } from 'react'
import Helmet from 'react-helmet'
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share'

import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import { ReactComponent as Divider } from 'assets/images/detailDivider.svg'
import NoData from 'components/emptyStates/noData/noData'
import LoadingBar from 'components/loadingBar/loadingBar'
import { NewsWidget } from 'components/newsWidget/newsWidget'
import DonationsWidget from 'components/donationsWidget/donationsWidgetConnected'
import RolesWidget from 'components/rolesWidget/rolesWidgetConnected'
import NotificationsWidget from 'components/notificationsWidget/notificationsWidgetConnected'
import InsolvencyWidget from 'components/insolvencyWidget/insolvencyWidgetConnected'
import DemagogWidget from 'components/demagogWidget/demagogWidgetConnected'
import EngagementChart from 'components/engagementChart/engagementChartConnected'
import { ContactsWidget } from 'components/contactsWidget/contactsWidget'
import ProfilePicture from 'components/profilePicture/profilePicture'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import Error from 'pages/error/error'

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
  onDispose: () => void
  match: {
    params: {
      id: string
    }
  }
  photoUrl: string
  isValid?: boolean
}

const scrollTo = (element: HTMLElement | null) => {
  if (!element) {
    return
  }
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const getDimensions = (element: HTMLElement) => {
  const { height } = element.getBoundingClientRect()
  const offsetTop = element.offsetTop
  const offsetBottom = offsetTop + height

  return {
    height,
    offsetBottom,
    offsetTop,
  }
}

const Detail: React.FC<Props> = props => {
  const [visibleSection, setVisibleSection] = useState('')
  const overviewRef = useRef<HTMLDivElement>(null)
  const careerRef = useRef<HTMLDivElement>(null)
  const engageRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = [
    { section: 'Overview', ref: overviewRef },
    { section: 'Career', ref: careerRef },
    { section: 'Engagement', ref: engageRef },
    { section: 'Media', ref: mediaRef },
  ]
  const detailWrapper = useRef<HTMLDivElement>(null)
  const stickyHeader = styles.sticky
  const topHeaderHeight = 64
  const {
    loadDetail,
    match: {
      params: { id },
    },
    onDispose,
  } = props
  const aboutWidgetCustomClassNames = classnames(styles.widget, !props.description && styles.noData)

  useEffect(() => {
    loadDetail(id)
    return (): void => {
      onDispose()
    }
  }, [loadDetail, id, onDispose])

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current
      let scrollPosition = 0
      if (header) {
        const { height: headerHeight } = getDimensions(header)
        scrollPosition = window.scrollY + headerHeight
      } else {
        scrollPosition = window.scrollY
      }

      const selected = sectionRefs.find(({ section, ref }) => {
        const element = ref.current
        if (element) {
          const { offsetBottom, offsetTop } = getDimensions(element)
          return scrollPosition > offsetTop && scrollPosition < offsetBottom
        }
        return false
      })

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section)
      } else if (!selected && visibleSection) {
        setVisibleSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleSection, sectionRefs, headerRef])

  window.addEventListener('scroll', () => {
    if (!detailWrapper.current) {
      return
    }
    if (window.scrollY > topHeaderHeight && !detailWrapper.current.classList.contains(stickyHeader)) {
      detailWrapper.current.classList.add(stickyHeader)
    } else if (window.scrollY <= topHeaderHeight && detailWrapper.current.classList.contains(stickyHeader)) {
      detailWrapper.current.classList.remove(stickyHeader)
    }
  })

  const MenuBar: React.FC = () => {
    return (
      <Fragment>
        <div
          className={classnames(styles.link, visibleSection === 'Overview' ? styles.selected : '')}
          onClick={() => scrollTo(overviewRef.current)}
        >
          Přehled
        </div>
        <div
          className={classnames(styles.link, visibleSection === 'Career' ? styles.selected : '')}
          onClick={() => scrollTo(careerRef.current)}
        >
          Kariéra politika
        </div>
        <div
          className={classnames(styles.link, visibleSection === 'Engagement' ? styles.selected : '')}
          onClick={() => scrollTo(engageRef.current)}
        >
          Angažovanost
        </div>
        <div
          className={classnames(styles.link, visibleSection === 'Media' ? styles.selected : '')}
          onClick={() => scrollTo(mediaRef.current)}
        >
          Mediální obraz
        </div>
      </Fragment>
    )
  }

  return (
    <div className={styles.detail} ref={detailWrapper}>
      {props.isLoading && <LoadingBar />}
      {!props.isLoading && !props.isValid && <Error />}
      {!props.isLoading && props.isValid && (
        <Fragment>
          <Helmet>
            <title>{props.fullname} | Naši Politici</title>
          </Helmet>
          <div className={styles.heading} ref={headerRef}>
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
                            <Fragment>
                              &nbsp;- <CrossIcon className={styles.crossIcon} /> {props.deathYear}
                            </Fragment>
                          )}
                        </div>
                      )}
                      {props.currentParty && (
                        <>
                          <div className={styles.divider} />
                          <div className={styles.currentParty}>{props.currentParty}</div>
                        </>
                      )}
                    </div>
                    <div className={styles.lastUpdateWrapper}>
                      <div className={styles.divider} />
                      <div className={styles.lastUpdate}>
                        {props.lastUpdate && (
                          <div className={styles.lastUpdateLabel}>Zkontrolováno {props.lastUpdate}</div>
                        )}
                        {!props.lastUpdate && <div className={styles.lastUpdateEmpty}>Čeká na kontrolu</div>}
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
              <div id="Overview" ref={overviewRef} className={styles.section}>
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
              <div id="Career" ref={careerRef} className={styles.section}>
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
              <div id="Engagement" ref={engageRef} className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Angažovanost</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <EngagementChart />
              </div>
              <div id="Media" ref={mediaRef} className={styles.section}>
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
        </Fragment>
      )}
    </div>
  )
}

export default Detail
