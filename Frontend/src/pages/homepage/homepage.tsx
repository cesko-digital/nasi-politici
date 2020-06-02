import classnames from 'classnames'
import React from 'react'
import SearchBar from 'components/searchBar/searchBarConnected'
import Result from 'components/result/resultConnected'

import styles from './homepage.module.scss'

import logo from 'assets/images/logo-np.svg'

export interface Props {
  wasSearched: boolean
  profilesCount: number
  onEnter: () => void
}

const Homepage: React.FC<Props> = props => {
  const { onEnter, profilesCount } = props
  const profilesCountClass = classnames(styles.profilesCount, !!profilesCount && styles.profilesCountLoaded)
  React.useEffect(() => {
    !profilesCount && onEnter()
  }, [onEnter, profilesCount])
  return (
    <div className={styles.homepage}>
      <div className={styles.wrapper}>
        {!props.wasSearched && (
          <div className={styles.intro}>
            <img src={logo} alt={logo} className={styles.logo} />
            <div className={styles.perex}>
              Největší otevřená databáze českých politiků a političek. Zjistěte si, kdo vám vládne.
              <div className={profilesCountClass}>Aktuálně zde najdete {profilesCount} profilů.</div>
            </div>
          </div>
        )}
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
        <Result />
      </div>
    </div>
  )
}

export default Homepage
