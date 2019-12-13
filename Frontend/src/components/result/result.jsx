import React from 'react'
import {createStructuredSelector} from 'reselect'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {getSearchResults, isSearchLoading} from '../../redux/selectors'
import LoadingBar from '../loadingBar/loadingBar'
import ProfilePicture from '../profilePicture/profilePicture'
import styles from './result.module.scss'

function ResultRow({result}) {
	return (
    <Link className={styles.resultRow} to={`/detail/${result.id}`}>
      <div className={styles.resultItem}>
        <div className={styles.pictureWrapper} >
          <ProfilePicture src={result.photo} alt={result.surname}/>
        </div>
        <div className={styles.dataWrapper}>
          <div className={styles.nameWrapper}>
            <div className={styles.name}>{result.name} {result.surname}</div>
            <div className={styles.initialsWrapper}>
              {result.birthYear && <div className={styles.birthYear}>*{result.birthYear}</div>}
              <div className={styles.divider} />
              {result.currentParty && <div className={styles.currentParty}>{result.currentParty}</div>}
            </div>
          </div>
          <div className={styles.linkWrapper}>
            <div className={styles.link}>Zobrazit profil</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function EmptyState({result}) {
	return (<div>¯\_(ツ)_/¯ Tak toho tu nemame ¯\_(ツ)_/¯</div>)
}

function Result({results, loading}) {
// TODO vyresit mnozne/jednotne cislo
	return (
		<React.Fragment>
      {loading && <LoadingBar />}
      {!loading && results && results.length === 0 && <EmptyState />}
      {!loading && results && !!results.length &&
        <div>
          <div className={styles.count}>Nalezeni {results.length} politici</div>
          <div className={styles.results}>{results.map(result => <ResultRow key={result.id} result={result} />)}</div>
        </div>}
		</React.Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  results: getSearchResults,
  loading: isSearchLoading,
})

export default connect(mapStateToProps)(Result);
