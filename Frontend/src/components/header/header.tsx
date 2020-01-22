import * as React from 'react'
import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import classnames from 'classnames'
import SearchBar from '../searchBar/searchBarConnected'
import { ReactComponent as Search } from '../../assets/images/searchIcon.svg'

import styles from './header.module.scss'

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const [openSearch, setOpenSearch] = React.useState(false)
  const match = useRouteMatch('/')
  const matchDetail = useRouteMatch('/detail/:id')

  const showMobileSearch = (): void => {
    setOpenMenu(false)
    setOpenSearch(true)
  }

  return (
    <header className={classnames(matchDetail && styles.detailHeader, styles.header)}>
      <div className={classnames(openSearch && styles.mobileSearch, styles.wrapper)}>
        <div className={styles.navigation}>
          {match && !match.isExact && (
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logo} />
            </Link>
          )}
          {matchDetail && (
            <React.Fragment>
              <div className={styles.searchActions}>
                <div onClick={(): void => setOpenSearch(false)} className={styles.cancel}>
                  Zrušit
                </div>
                <SearchBar form={styles.form} wrapperClassname={styles.headerSearchBar} />
                <div onClick={showMobileSearch} className={styles.searchIconWrapper}>
                  <Search className={styles.searchIcon} />
                </div>
              </div>
              <div onClick={(): void => setOpenMenu(!openMenu)} className={styles.hamburger}>
                Menu
              </div>
            </React.Fragment>
          )}
          <div className={classnames(styles.links, openMenu && styles.openMenu)}>
            <Link to="/o-projektu" className={styles.link}>
              O Projektu
            </Link>
            <Link to="/pro-media" className={styles.link}>
              Pro Média
            </Link>
          </div>
        </div>
        {match && !match.isExact && <SearchBar form={styles.form} wrapperClassname={styles.headerSearchBar} />}
      </div>
    </header>
  )
}

export default Header
