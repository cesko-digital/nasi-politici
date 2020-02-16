export interface Result {
  id: string
  name: string
  surname: string
  birthYear: string
  currentParty: string | null
}

export interface SearchState {
  query: string
  results: Result[]
  wasSearched: boolean
}

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SEARCH = 'SEARCH'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const RESET_SEARCH_QUERY = 'RESET_SEARCH_QUERY'

interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY
  payload: string
}

interface ResetSearchQueryAction {
  type: typeof RESET_SEARCH_QUERY
}

interface SearchAction {
  type: typeof SEARCH
}

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS
  payload: {
    results: Result[]
    wasSearched: boolean
  }
}

export type SearchActionTypes = SetSearchQueryAction | SearchAction | SetSearchResultsAction | ResetSearchQueryAction
