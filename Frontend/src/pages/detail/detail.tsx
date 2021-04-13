import classnames from 'classnames'
import React, { Fragment, useState, useEffect, useRef } from 'react'
import Helmet from 'react-helmet'

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
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import Error from 'pages/error/error'

import styles from './detail.module.scss'
import { getDimensions, scrollTo } from '../../utils/display'
import { DetailSections } from '../../store/detail/types'
import { MenuBar } from './menuBar'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loadDetail, setInitAction } from '../../store/detail/actions'
import { AppState } from '../../store'
import { getFullNameString } from '../../store/detail/selectors'
import { DetailHeader } from './detailHeader'

export function Detail() {
  const dispatch = useDispatch()
  const { detail, loadingDetail: isLoading } = useSelector((state: AppState) => state.detail)
  const { description, source } = detail
  const [visibleSection, setVisibleSection] = useState<DetailSections | null>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const careerRef = useRef<HTMLDivElement>(null)
  const engageRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = [
    { section: DetailSections.OVERVIEW, ref: overviewRef },
    { section: DetailSections.CAREER, ref: careerRef },
    { section: DetailSections.ENGAGEMENT, ref: engageRef },
    { section: DetailSections.MEDIA, ref: mediaRef },
  ]
  const detailWrapper = useRef<HTMLDivElement>(null)
  const stickyHeader = styles.sticky
  const topHeaderHeight = 64
  const { id } = useParams<{ id: string }>()
  const fullName = getFullNameString(detail)
  const isValid = !!source
  const aboutWidgetCustomClassNames = classnames(styles.widget, !description && styles.noData)

  useEffect(() => {
    dispatch(loadDetail(id))
    return () => {
      dispatch(setInitAction())
    }
  }, [dispatch, id])

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
        setVisibleSection(null)
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

  return (
    <div className={styles.detail} ref={detailWrapper}>
      {isLoading && <LoadingBar />}
      {!isLoading && !isValid && <Error />}
      {!isLoading && isValid && (
        <Fragment>
          <Helmet>
            <title>{fullName} | Naši Politici</title>
          </Helmet>
          <DetailHeader detail={detail} ref={headerRef} />
          <div className={styles.body}>
            <div className={styles.menuWrapper}>
              <div className={styles.menu}>
                <MenuBar
                  visibleSection={visibleSection}
                  onOverviewClick={() => scrollTo(overviewRef.current)}
                  onCareerClick={() => scrollTo(careerRef.current)}
                  onEngagementClick={() => scrollTo(engageRef.current)}
                  onMediaClick={() => scrollTo(mediaRef.current)}
                />
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
                      {!!description && (
                        <div className={styles.tags}>
                          <ReportModalTrigger
                            className={styles.reportBtnWrapper}
                            modalTitle={`${fullName}, ve zkratce`}
                          >
                            <ReportBtn className={styles.reportBtn} />
                          </ReportModalTrigger>
                        </div>
                      )}
                    </div>
                    {!description && <NoData />}
                    {!!description && <div className={styles.description}>{description}</div>}
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
