import React from 'react'
import SearchBar from '../../components/searchBar/searchBarConnected'
import Result from '../../components/result/resultConnected'

import styles from './homepage.module.scss'

import logo from '../../assets/images/logo-np.svg'

export interface Props {
	wasSearched: boolean;
}

const Homepage: React.FC<Props> = (props) => {
  return (
    <div className={styles.homepage}>
      <div className={styles.wrapper}>
        {!props.wasSearched && <div className={styles.intro}>
          <img src={logo} alt={logo} className={styles.logo}/>
          <div className={styles.perex}>Mapujeme stav korupce v ČR a aktivně přispíváme k jejímu omezování. Hledejte političky a politiky.</div>
        </div>}
        <div className={styles.searchWrapper}><SearchBar /></div>
        <Result />
      </div>
    </div>
  )
}

export default Homepage
