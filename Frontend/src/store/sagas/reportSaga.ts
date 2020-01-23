import { takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { SUBMIT_REPORT_MODAL } from 'store/report/types'

function* handleSubmitReportModal(): SagaIterator {
  // TODO zavolat BE routu pro poslani emailu
}

function* reportSaga(): SagaIterator {
  yield takeLatest(SUBMIT_REPORT_MODAL, handleSubmitReportModal)
}

export default reportSaga
