import { call, put, select, takeLatest } from 'redux-saga/effects'

import {SEARCH, SET_SEARCH_QUERY} from '../search/types'
import {LOAD_DETAIL} from '../detail/types'
import {SUBMIT_REPORT_MODAL} from '../report/types'

import {setSearchResults, search, setSearchQuery} from '../search/actions'
import {setDetail, loadingDetailEnded, loadingDetailStarted, loadDetail} from '../detail/actions'
import {setDemagogData, resetDemagogData} from '../demagog/actions'
import {setArticles, resetArticles} from '../articles/actions'

import {getSearchQuery} from '../search/selectors'
import API from '../../services/api'
import API_MOCK from '../../services/apiMock'
import { push } from 'connected-react-router'
import {ArticleResponse, Detail, DemagogResponse, SearchResult} from '../../services/apiTypes'

const api = process.env.REACT_APP_USE_API_MOCK ? API_MOCK : API

function* handleSearch(action: ReturnType<typeof search|typeof setSearchQuery>) {
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

function* handleSubmitReportModal() {
	// TODO zavolat BE routu pro poslani emailu
}

function* loadNews(detail: Detail) {
	try {
		const fullName = detail.name + " " + detail.surname
    const party = detail.currentParty
    const searchQuery = detail.name + "+" + detail.surname + "+" + party
    const news: ArticleResponse = yield call(api.fetchNews, fullName, party, searchQuery)
    yield put(setArticles(news.articles))
	} catch (error) {
		yield put(resetArticles())
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* loadDemagog(id: string) {
	try {
		const {data: demagog}: DemagogResponse = yield call(api.fetchDemagog, id)
		const speaker = demagog.speakers[0]
		if (speaker) {
			yield put(setDemagogData({id: speaker.id, ...speaker.stats}))
		} else {
			yield put(resetDemagogData())
		}
	} catch (error) {
		yield put(resetDemagogData())
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* handleLoadDetail(action: ReturnType<typeof loadDetail>) {
  yield put(loadingDetailStarted())
  try {
		const detail: Detail = yield call(api.fetchDetail, action.payload)
		yield put(setDetail(detail))
		yield call(loadDemagog, action.payload)
		yield call(loadNews, detail)
  } catch (error) {
		console.error(error)
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
