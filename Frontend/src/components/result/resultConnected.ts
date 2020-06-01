import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getSearchResults, getSearchQuery, wasSearched, isLoading } from 'store/search/selectors'
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
  isLoading: boolean
}

const mapStateToProps = createStructuredSelector<AppState, StateProps>({
  results: getSearchResults,
  query: getSearchQuery,
  wasSearched,
  isLoading,
})

export default connect(mapStateToProps)(Result)
