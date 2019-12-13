import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import SearchBar from '../../components/searchBar/searchBar'
import Result from '../../components/result/result'
import {wasSearched} from '../../redux/selectors'

import styles from './homepage.module.scss'

import logo from '../../assets/images/logo-np.svg'

// TODO loading pri vyhledavani
function Homepage(props) {
  return (
    <div className={styles.homepage}>
      <div className={styles.wrapper}>
        {!props.wasSearched && <div className={styles.intro}>
          <img src={logo} alt={logo} className={styles.logo}/>
          <div className={styles.perex}>Mapujeme stav korupce v ČR a aktivně přispíváme k jejímu omezování. Hledejte političky a politiky.</div>
        </div>}
        <div className={styles.searchWrapper}><SearchBar/></div>
        <Result />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({wasSearched})

export default connect(mapStateToProps)(Homepage);

