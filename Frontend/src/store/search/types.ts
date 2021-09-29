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
  filters: FiltersValues
}

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SEARCH = 'SEARCH'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const RESET_SEARCH_QUERY = 'RESET_SEARCH_QUERY'
export const ON_HOMEPAGE_ENTER = 'ON_HOMEPAGE_ENTER'
export const SET_PROFILES_COUNT = 'SET_PROFILES_COUNT'
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING'
export const FILTER = 'FILTER'
export const SET_FILTERS = 'SET_FILTERS'
export const RESET_FILTERS = 'RESET_FILTERS'

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

export enum Filters {
  PLACE = 'place',
  FUNCTION = 'function',
  PARTY = 'party',
}

export type FiltersValues = {
  [key in keyof typeof Filters]?: string
}

interface SetFiltersAction {
  type: typeof SET_FILTERS
  payload: {
    filters: FiltersValues
    instantSearch: boolean
  }
}

interface ResetFiltersAction {
  type: typeof RESET_SEARCH_QUERY
}

interface FilterAction {
  type: typeof FILTER
}

export type SearchActionTypes =
  | SetSearchQueryAction
  | SearchAction
  | SetSearchResultsAction
  | ResetSearchQueryAction
  | OnEnterAction
  | SetProfilesCountAction
  | SetSearchLoading
  | FilterAction
  | SetFiltersAction
  | ResetFiltersAction
