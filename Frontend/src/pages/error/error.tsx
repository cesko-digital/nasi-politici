import * as React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ErrorIcon } from 'assets/images/404.svg'

import styles from './error.module.scss'

const Error: React.FC = () => {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.header}>Tato stránka neexistuje :(</h1>
      <Link to="/" className={styles.link}>
        Přejít na hlavní stránku
      </Link>
      <ErrorIcon />
    </div>
  )
}

export default Error
