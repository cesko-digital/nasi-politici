export interface Result {
  id: string
  shortName: string
  fullName: string
  birthYear: number
  deathYear: number | null
  currentParty: string | null
}

export interface SearchState {
  query: string
  results: Result[]
  wasSearched: boolean
  profilesCount: number
  isLoading: boolean
}

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SEARCH = 'SEARCH'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const RESET_SEARCH_QUERY = 'RESET_SEARCH_QUERY'
export const ON_HOMEPAGE_ENTER = 'ON_HOMEPAGE_ENTER'
export const SET_PROFILES_COUNT = 'SET_PROFILES_COUNT'
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'

interface OnEnterAction {
  type: typeof ON_HOMEPAGE_ENTER
}

interface SetProfilesCountAction {
  type: typeof SET_PROFILES_COUNT
  payload: number
}

interface SetSearchQueryAction {
  type: typeof SET_SEARCH_QUERY
  payload: {
    query: string
    instantSearch: boolean
  }
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

interface SetSearchLoading {
  type: typeof SET_SEARCH_LOADING
  payload: boolean
}

export type SearchActionTypes =
  | SetSearchQueryAction
  | SearchAction
  | SetSearchResultsAction
  | ResetSearchQueryAction
  | OnEnterAction
  | SetProfilesCountAction
  | SetSearchLoading
