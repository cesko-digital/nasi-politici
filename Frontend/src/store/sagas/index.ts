import { all, fork } from 'redux-saga/effects'

import searchSaga from './searchSaga'
import detailSaga from './detailSaga'
import reportSaga from './reportSaga'
import { SagaIterator } from 'redux-saga'

const rootSaga = function*(): SagaIterator {
  yield all([fork(searchSaga)])
  yield all([fork(detailSaga)])
  yield all([fork(reportSaga)])
}

export default rootSaga
