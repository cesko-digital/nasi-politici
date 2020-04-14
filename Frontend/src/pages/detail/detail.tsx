import * as React from 'react'
import classnames from 'classnames'
import Helmet from 'react-helmet'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share'
import { ReactComponent as ReportBtn } from 'assets/images/report.svg'
import { ReactComponent as Divider } from 'assets/images/detailDivider.svg'
import NoData from 'components/emptyStates/noData/noData'
import LoadingBar from 'components/loadingBar/loadingBar'
import NewsWidget from 'components/newsWidget/newsWidgetConnected'
import DonationsWidget from 'components/donationsWidget/donationsWidgetConnected'
import RolesWidget from 'components/rolesWidget/rolesWidgetConnected'
import InsolvencyWidget from 'components/insolvencyWidget/insolvencyWidgetConnected'
import DemagogWidget from 'components/demagogWidget/demagogWidgetConnected'
import ContactsWidget from 'components/contactsWidget/contactsWidgetConnected'
import ProfilePicture from 'components/profilePicture/profilePicture'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import Error from 'pages/error/error'
import ExplanationModal from 'components/explanationModal/explanationModal'
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
  loadDetail: (id: string) => void
  match: {
    params: {
      id: string
    }
  }
  photoUrl: string
  isValid?: boolean
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

  const engageWidgetCustomClassNames = classnames(styles.widget, styles.engage, !props.engagement && styles.noData)
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
              <ProfilePicture src={props.photoUrl} name={props.fullname} customClassName={styles.photo} />
              <div className={styles.initials}>
                <div className={styles.initialsWrapper}>
                  <div className={styles.fullname}>{props.fullname}</div>
                  <div className={styles.personal}>
                    {props.birthYear && (
                      <div className={styles.birthYear}>
                        *{props.birthYear}
                        {props.deathYear && ` - ✝${props.deathYear}`}
                      </div>
                    )}
                    <div className={styles.divider}></div>
                    <div className={styles.currentParty}>{props.currentParty}</div>
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
                  <LinkedinShareButton className={styles.shareBtn} url={window.location.href}>
                    <LinkedinIcon round size={30} />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.menuWrapper}>
              <div className={styles.menu}>
                <a href="#overview" className={styles.link}>
                  Přehled
                </a>
                <a href="#career" className={styles.link}>
                  Kariéra politika
                </a>
                <a href="#engagement" className={styles.link}>
                  Angažovanost
                </a>
                <a href="#media" className={styles.link}>
                  Mediální obraz
                </a>
              </div>
            </div>
            <div className={styles.detail}>
              <div id="overview" className={styles.section}>
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
                  <DemagogWidget />
                  <ContactsWidget />
                </div>
              </div>
              <div id="career" className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Kariéra</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <div className={styles.widgets}>
                  <RolesWidget />
                  <DonationsWidget />
                  <InsolvencyWidget />
                </div>
              </div>
              <div id="engagement" className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Angažovanost</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <div className={engageWidgetCustomClassNames}>
                  <div className={styles.header}>
                    <div className={styles.headerTitleWrapper}>
                      <h2 className={styles.title}>Angažovanost</h2>
                      <ExplanationModal title="Angažovanost">
                        Ne každý máme rádi pavouky. Ale majetkové a personální pavouky musí mít rád každý. Přehledným
                        způsobem Vám totiž ukazují, kam až sahá napojení politiků. Tyhle pavučiny ale jsou spředeny z
                        otevřených zdrojů, tudíž nemusí ukazovat úplně všechny existující vazby, ale zobrazují ty
                        potvrzené.
                      </ExplanationModal>
                    </div>
                    <div className={styles.tags}>
                      <ReportModalTrigger
                        className={styles.reportBtnWrapper}
                        modalTitle={`${props.fullname}, angažovanost`}
                      >
                        <ReportBtn className={styles.reportBtn} />
                      </ReportModalTrigger>
                    </div>
                  </div>
                  {!props.engagement && <NoData />}
                </div>
              </div>
              <div id="media" className={styles.section}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>Mediální obraz</h1>
                  <Divider className={styles.titleDivider} />
                </div>
                <div className={styles.widgets}>
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
