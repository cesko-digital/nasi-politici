import {AppState} from '../index'

export const getSearchQuery = (store: AppState) => store.search.query
export const getSearchResults = (store: AppState) => store.search.results
export const wasSearched = (store: AppState) => store.search.wasSearched
