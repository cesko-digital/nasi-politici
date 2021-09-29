import {
  FILTER,
  FiltersValues,
  ON_HOMEPAGE_ENTER,
  RESET_SEARCH_QUERY,
  Result,
  SEARCH,
  SearchActionTypes,
  SET_FILTERS,
  SET_PROFILES_COUNT,
  SET_SEARCH_LOADING,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
} from './types'

export const setSearchQuery = (query: string, instantSearch: boolean): SearchActionTypes => ({
  type: SET_SEARCH_QUERY,
  payload: { query, instantSearch },
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

export const onEnter = (): SearchActionTypes => ({
  type: ON_HOMEPAGE_ENTER,
})

export const setProfilesCount = (count: number): SearchActionTypes => ({
  type: SET_PROFILES_COUNT,
  payload: count,
})

export const setSearchLoading = (isLoading: boolean): SearchActionTypes => ({
  type: SET_SEARCH_LOADING,
  payload: isLoading,
})

export const filter = (): SearchActionTypes => ({
  type: FILTER,
})

export const setFilters = (filters: FiltersValues, instantSearch: boolean): SearchActionTypes => ({
  type: SET_FILTERS,
  payload: { filters, instantSearch },
})

export const resetFilters = (): SearchActionTypes => ({
  type: RESET_SEARCH_QUERY,
})
