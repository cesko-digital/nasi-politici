import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { LOAD_DETAIL } from 'store/detail/types'

import { setDetail, loadingDetailEnded, loadingDetailStarted, loadDetail } from 'store/detail/actions'
import { setDemagogData, resetDemagogData } from 'store/demagog/actions'
import { setArticles, resetArticles } from 'store/articles/actions'

import API from 'services/api'
import API_MOCK from 'services/apiMock'
import { ArticleResponse, Detail, DemagogResponse } from 'services/apiTypes'

const api = process.env.REACT_APP_USE_API_MOCK ? API_MOCK : API

function* loadNews(detail: Detail): SagaIterator {
  try {
    const fullName = detail.name + ' ' + detail.surname
    const party = detail.currentParty
    const searchQuery = detail.name + '+' + detail.surname + '+' + party
    const news: ArticleResponse = yield call(api.fetchNews, fullName, party, searchQuery)
    yield put(setArticles(news.articles))
  } catch (error) {
    yield put(resetArticles())
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* loadDemagog(id: string): SagaIterator {
  try {
    const { data: demagog }: DemagogResponse = yield call(api.fetchDemagog, id)
    const speaker = demagog.speakers[0]
    if (speaker) {
      yield put(setDemagogData({ id: speaker.id, ...speaker.stats }))
    } else {
      yield put(resetDemagogData())
    }
  } catch (error) {
    yield put(resetDemagogData())
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* handleLoadDetail(action: ReturnType<typeof loadDetail>): SagaIterator {
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

function* searchSaga(): SagaIterator {
  yield takeLatest(LOAD_DETAIL, handleLoadDetail)
}

export default searchSaga
