import { call, put, select, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { SEARCH, SET_SEARCH_QUERY, ON_HOMEPAGE_ENTER, SearchActionTypes } from 'store/search/types'
import { setSearchResults, setProfilesCount } from 'store/search/actions'
import { getSearchQuery } from 'store/search/selectors'
import API from 'services/api'
import API_MOCK from 'services/apiMock'
import { push } from 'connected-react-router'
import { SearchResult } from 'services/apiTypes'

const api = process.env.REACT_APP_USE_API_MOCK ? API_MOCK : API

function* handleSearch(action: SearchActionTypes): SagaIterator {
  if (action.type === SET_SEARCH_QUERY && !action.payload.instantSearch) return
  const query = yield select(getSearchQuery)
  if (!query) {
    yield put(setSearchResults([], false))
    return
  }
  yield put(push('/'))
  try {
    const persons: SearchResult[] = yield call(api.search, query)
    yield put(setSearchResults(persons, true))
  } catch (error) {
    yield put(setSearchResults([], true))
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* handleHomepageEnter(): SagaIterator {
  try {
    const count: number = yield call(api.fetchProfileCount)
    yield put(setProfilesCount(count))
  } catch (error) {
    yield put(setProfilesCount(0))
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* searchSaga(): SagaIterator {
  yield takeLatest([SEARCH, SET_SEARCH_QUERY], handleSearch)
  yield takeLatest([ON_HOMEPAGE_ENTER], handleHomepageEnter)
}

export default searchSaga
