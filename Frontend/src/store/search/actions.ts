import { SEARCH, SET_SEARCH_RESULTS, SET_SEARCH_QUERY, Result } from "./types";

export const setSearchQuery = (query: string) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setSearchResults = (results: Result[], wasSearched: boolean) => ({
  type: SET_SEARCH_RESULTS,
  payload: {results, wasSearched},
});

export const search = () => ({
  type: SEARCH,
});
