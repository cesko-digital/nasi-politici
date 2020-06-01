import * as React from 'react'
import { Link } from 'react-router-dom'
import ProfilePicture from 'components/profilePicture/profilePicture'
import styles from './result.module.scss'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { ReactComponent as ReportIcon } from 'assets/images/report.svg'
import ReportModalTrigger from 'components/reportModal/reportModalTriggerConnected'
import { dummyPluralize as pluralize } from 'utils/string'
import LoadingBar from 'components/loadingBar/loadingBar'

interface ResultRowProps {
  id: string
  shortName: string
  fullName: string
  birthYear: number
  deathYear: number | null
  currentParty: string | null
}

const ResultRow: React.FC<ResultRowProps> = ({ id, shortName, birthYear, currentParty, deathYear }) => {
  return (
    <Link className={styles.resultRow} to={`/detail/${id}`}>
      <div className={styles.resultItem}>
        <div className={styles.pictureWrapper}>
          <ProfilePicture src={`https://www.hlidacstatu.cz/Photo/${id}`} name={shortName} />
        </div>
        <div className={styles.dataWrapper}>
          <div className={styles.nameWrapper}>
            <div className={styles.name}>{shortName}</div>
            <div className={styles.initialsWrapper}>
              {birthYear && (
                <div className={styles.birthYear}>
                  *{birthYear}
                  {deathYear && (
                    <React.Fragment>
                      &nbsp;- <CrossIcon className={styles.crossIcon} /> {deathYear}
                    </React.Fragment>
                  )}
                </div>
              )}
              {currentParty && (
                <React.Fragment>
                  <div className={styles.divider} />
                  <div className={styles.currentParty}>{currentParty}</div>
                </React.Fragment>
              )}
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

interface EmptyStateProps {
  query: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ query }) => {
  return (
    <div>
      <div className={styles.emptyTitle}>žádnou političku ani politka jsme nenašli :(</div>
      <div className={styles.explanationWrapper}>
        <div className={styles.nonPolitician}>„{query}“ buď není politik, nebo ho zatím nemáme v databázi.</div>
        <div className={styles.usage}>
          Nejlepší výsledky vyledávání dostanete zadáním celého jména.
          <br />
          Nepřesnosti v diakritice náš systém toleruje.
        </div>
        <ReportModalTrigger modalTitle={`${query}, vyhledávání`} className={styles.report}>
          <ReportIcon />
          <div className={styles.text}>Nahlásit chybu</div>
        </ReportModalTrigger>
        <div className={styles.face}></div>
      </div>
    </div>
  )
}

interface Props {
  results: ResultRowProps[]
  query: string
  wasSearched: boolean
  isLoading: boolean
}

const Result: React.FC<Props> = ({ results, query, wasSearched, isLoading }) => {
  return (
    <React.Fragment>
      {wasSearched && results && results.length === 0 && <EmptyState query={query} />}
      {!isLoading && results && !!results.length && (
        <div>
          <div className={styles.count}>
            {pluralize(results.length, 'Nalezen', 'Nalezeni', 'Nalezeno')} {results.length}{' '}
            {pluralize(results.length, 'politik', 'politici', 'politiků')}
          </div>
          <div className={styles.results}>
            {results.map((result) => (
              <ResultRow {...result} key={result.id} />
            ))}
          </div>
        </div>
      )}
      {isLoading && <LoadingBar />}
    </React.Fragment>
  )
}

export default Result
