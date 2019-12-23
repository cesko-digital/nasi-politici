import React from 'react'
import {Link} from 'react-router-dom'
import {useRouteMatch} from "react-router-dom"
import classnames from 'classnames'
import SearchBar from '../searchBar/searchBar'

import styles from './header.module.scss'

function Header() {
  const match = useRouteMatch('/')
  const matchDetail = useRouteMatch('/detail/:id')
  console.log(matchDetail)
  return (
    <header className={classnames(matchDetail && styles.detailHeader, styles.header)}>
      <div className={styles.wrapper}>
        <div className={styles.navigation}>
          {!match.isExact && <Link to='/' className={styles.logoLink}>
            <div className={styles.logo}/>
          </Link>}
          <div className={styles.links}>
            <Link to='/o-projektu' className={styles.link}>O Projektu</Link>
            <Link to='/pro-media' className={styles.link}>Pro Média</Link>
          </div>
        </div>
        {!match.isExact && <SearchBar form={styles.form} wrapperClassname={styles.headerSearchBar}/>}
      </div>
    </header>
  )
}

export default Header;
