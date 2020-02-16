import { SEARCH, SET_SEARCH_RESULTS, SET_SEARCH_QUERY, RESET_SEARCH_QUERY, Result, SearchActionTypes } from './types'

export const setSearchQuery = (query: string): SearchActionTypes => ({
  type: SET_SEARCH_QUERY,
  payload: query,
})

export const resetSearchQuery = (): SearchActionTypes => ({
  type: RESET_SEARCH_QUERY,
})

export const setSearchResults = (results: Result[], wasSearched: boolean): SearchActionTypes => ({
  type: SET_SEARCH_RESULTS,
  payload: { results, wasSearched },
})

export const search = (): SearchActionTypes => ({
  type: SEARCH,
})
