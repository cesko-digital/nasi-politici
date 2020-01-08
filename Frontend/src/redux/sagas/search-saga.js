import { call, put, select, takeLatest } from 'redux-saga/effects'

import * as actions from '../action-types'
import {
  setSearchResults,
  setDetail,
  loadingDetailStarted,
  loadingDetailEnded,
	setDemagogData,
  setDetailNews,
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
  yield put(push('/'))
  try {
    const persons = yield call(api.search, query)
    yield put(setSearchResults(persons))
  } catch (error) {
    yield put(setSearchResults([]))
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* handleSubmitReportModal(action) {
	// TODO zavolat BE routu pro poslani emailu
}

function* handleLoadDetail(action) {
  yield put(loadingDetailStarted())
  try {
    const detail = yield call(api.fetchDetail, action.payload.id)
    yield put(setDetail(detail))
    const {data: demagog} = yield call(api.fetchDemagog, action.payload.id)
    const fullName = detail.name + " " + detail.surname
    const party = detail.currentParty
    const searchQuery = detail.name + "+" + detail.surname + "+" + party
    const news = yield call(api.fetchNews, fullName, party, searchQuery)
    yield put(setDetailNews(news))
    const speaker = demagog.speakers[0]
    yield put(setDemagogData(speaker ? speaker : {}))
  } catch (error) {
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
	yield put(loadingDetailEnded())
}

function* searchSaga() {
  yield takeLatest([actions.SEARCH, actions.SET_SEARCH_QUERY], handleSearch);
  yield takeLatest(actions.LOAD_DETAIL, handleLoadDetail);
  yield takeLatest(actions.SUBMIT_REPORT_MODAL, handleSubmitReportModal);
}

export default searchSaga;
