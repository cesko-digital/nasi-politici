import { call, put, select, takeLatest } from 'redux-saga/effects'

import {SEARCH, SET_SEARCH_QUERY} from '../search/types'
import {LOAD_DETAIL} from '../detail/types'
import {SUBMIT_REPORT_MODAL} from '../report/types'

import {setSearchResults, search, setSearchQuery} from '../search/actions'
import {setDetail, loadingDetailEnded, loadingDetailStarted, loadDetail} from '../detail/actions'
import {setDemagogData} from '../demagog/actions'
import {setArticles} from '../articles/actions'

import {getSearchQuery} from '../search/selectors'
import API from '../../services/api'
import API_MOCK from '../../services/apiMock'
import { push } from 'connected-react-router'
import {ArticleResponse, Detail, DemagogResponse} from '../../services/apiTypes'

const api = process.env.REACT_APP_USE_API_MOCK ? API_MOCK : API

function* handleSearch(action: ReturnType<typeof search|typeof setSearchQuery>) {
  const query = yield select(getSearchQuery)
  if (!query) {
    yield put(setSearchResults([], false))
    return
  }
  yield put(push('/'))
  try {
    const persons = yield call(api.search, query)
    yield put(setSearchResults(persons, true))
  } catch (error) {
    yield put(setSearchResults([], true))
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* handleSubmitReportModal() {
	// TODO zavolat BE routu pro poslani emailu
}

function* handleLoadDetail(action: ReturnType<typeof loadDetail>) {
  yield put(loadingDetailStarted())
  try {
    const detail: Detail = yield call(api.fetchDetail, action.payload)
    yield put(setDetail(detail))
    const {data: demagog}: DemagogResponse = yield call(api.fetchDemagog, action.payload)
    const fullName = detail.name + " " + detail.surname
    const party = detail.currentParty
    const searchQuery = detail.name + "+" + detail.surname + "+" + party
    const news: ArticleResponse = yield call(api.fetchNews, fullName, party, searchQuery)
    yield put(setArticles(news.articles))
    const speaker = demagog.speakers[0]
    if (speaker) yield put(setDemagogData({id: speaker.id, ...speaker.stats}))
  } catch (error) {
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
	yield put(loadingDetailEnded())
}

function* searchSaga() {
  yield takeLatest([SEARCH, SET_SEARCH_QUERY], handleSearch);
  yield takeLatest(LOAD_DETAIL, handleLoadDetail);
  yield takeLatest(SUBMIT_REPORT_MODAL, handleSubmitReportModal);
}

export default searchSaga;
