import React from 'react'
import {Link} from 'react-router-dom'
import ProfilePicture from '../profilePicture/profilePicture'
import styles from './result.module.scss'
import { ReactComponent as ReportIcon } from '../../assets/images/report.svg';
import ReportModalTrigger from '../reportModal/reportModalTriggerConnected'
import {dummyPluralize as pluralize} from '../../utils/string'

interface ResultRowProps {
	id: string;
	name: string;
	surname: string;
	birthYear: string;
	currentParty: string | null;
}

function ResultRow({id, name, surname, birthYear, currentParty}: ResultRowProps) {
	return (
    <Link className={styles.resultRow} to={`/detail/${id}`}>
      <div className={styles.resultItem}>
        <div className={styles.pictureWrapper} >
          <ProfilePicture src={`https://www.hlidacstatu.cz/Photo/${id}`} name={surname}/>
        </div>
        <div className={styles.dataWrapper}>
          <div className={styles.nameWrapper}>
            <div className={styles.name}>{name} {surname}</div>
            <div className={styles.initialsWrapper}>
              {birthYear && <div className={styles.birthYear}>*{birthYear}</div>}
              <div className={styles.divider} />
              {currentParty && <div className={styles.currentParty}>{currentParty}</div>}
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

function EmptyState({query}: {query: string}) {
	return (
		<div>
			<div className={styles.emptyTitle}>žádnou političku ani politka jsme nenašli :(</div>
			<div className={styles.explanationWrapper}>
				<div className={styles.nonPolitician}>„{query}“ buď není politik, nebo ho zatím nemáme v databázi.</div>
				<div className={styles.usage}>Nejlepší výsledky vyledávání dostanete zadáním celého jména.<br />
					Nepřesnosti v diakritice náš systém toleruje.
				</div>
				<ReportModalTrigger
					modalTitle={`${query}, vyhledávání`}
					className={styles.report}
				>
					<ReportIcon />
					<div className={styles.text}>Nahlásit chybu</div>
				</ReportModalTrigger>
				<div className={styles.face}></div>
			</div>
		</div>
	)
}

interface Props {
	results: ResultRowProps[],
	query: string,
	wasSearched: boolean,
}

export default ({results, query, wasSearched}: Props) => {
	return (
		<React.Fragment>
      {wasSearched && results && results.length === 0 && <EmptyState query={query} />}
      {results && !!results.length &&
        <div>
          <div className={styles.count}>{pluralize(results.length, 'Nalezen', 'Nalezeni', 'Nalezeno')} {results.length} {pluralize(results.length, 'politik', 'politici', 'politiků')}</div>
          <div className={styles.results}>{results.map(result => <ResultRow {...result} key={result.id} />)}</div>
        </div>}
		</React.Fragment>
  )
}
