import { call, put, select, takeLatest } from 'redux-saga/effects'

import {SEARCH, LOAD_DETAIL, SUBMIT_REPORT_MODAL} from '../action-types'
import {
  setSearchResults,
  setDetail,
  loadingDetailStarted,
  loadingDetailEnded,
  searchEnded,
  searchStarted,
  // setDetailNews,
} from '../actions'
import {getSearchQuery} from '../selectors'
import API from '../../services/api'
import API_MOCK from '../../services/apiMock'
import { push } from 'connected-react-router'

const api = process.env.REACT_APP_USE_API_MOCK ? API_MOCK : API

function* handleSearch(action) {
  const query = yield select(getSearchQuery)
  if (!query) {
    yield put(setSearchResults(null))
    return
  }
  yield put(searchStarted())
  yield put(push('/'))
  try {
    const persons = yield call(api.search, query)
    yield put(setSearchResults(persons))
  } catch (error) {
    yield put(setSearchResults([]))
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
  yield put(searchEnded())
}

function* handleSubmitReportModal(action) {
	// TODO zavolat BE routu pro poslani emailu
}

function* handleLoadDetail(action) {
  yield put(loadingDetailStarted())
  try {
    const detail = yield call(api.fetchDetail, action.payload.id)
    yield put(setDetail(detail))
    // const news = yield call(api.fetchNews, action.payload.id)
    // yield put(setDetailNews(news))
  } catch (error) {
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
	yield put(loadingDetailEnded())
}

function* searchSaga() {
  yield takeLatest(SEARCH, handleSearch);
  yield takeLatest(LOAD_DETAIL, handleLoadDetail);
  yield takeLatest(SUBMIT_REPORT_MODAL, handleSubmitReportModal);
}

export default searchSaga;
