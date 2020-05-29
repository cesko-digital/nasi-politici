import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSearchResults, getSearchQuery, wasSearched } from 'store/search/selectors'
import Result from './result'
import { AppState } from 'store'

interface StateProps {
  results: Array<{
    id: string
    shortName: string
    fullName: string
    birthYear: number
    deathYear: number | null
    currentParty: string | null
  }>
  wasSearched: boolean
  query: string
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  results: getSearchResults,
  query: getSearchQuery,
  wasSearched,
})

export default connect(mapStateToProps)(Result)
