import { AppState } from 'store'
import { FiltersValues, Result } from './types'

export const getSearchQuery = (store: AppState): string => store.search.query
export const getSearchResults = (store: AppState): Result[] => store.search.results
export const wasSearched = (store: AppState): boolean => store.search.wasSearched
export const getProfilesCount = (store: AppState): number => store.search.profilesCount
export const isLoading = (store: AppState): boolean => store.search.isLoading
export const getFilters = (store: AppState): FiltersValues => store.search.filters
