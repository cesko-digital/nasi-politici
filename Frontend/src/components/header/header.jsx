import React from 'react'
import {Link} from 'react-router-dom'
import {useRouteMatch} from "react-router-dom"
import SearchBar from '../searchBar/searchBar'
import logo from '../../assets/images/logo-np.svg'
import styles from './header.module.scss'

function Header() {
  const match = useRouteMatch('/')
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.navigation}>
          {!match.isExact && <Link to='/' className={styles.logoLink}>
            <img src={logo} alt={logo} className={styles.logo}/>
          </Link>}
          <div className={styles.links}>
            <Link to='/' className={styles.link}>Home</Link>
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
