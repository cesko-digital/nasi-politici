import { takeLatest, call } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { SUBMIT_REPORT_MODAL } from 'store/report/types'
import { submitReportModal } from 'store/report/actions'
import API from 'services/api'
import API_MOCK from 'services/apiMock'

const api = process.env.REACT_APP_USE_API_MOCK ? API_MOCK : API

function* handleSubmitReportModal(action: ReturnType<typeof submitReportModal>): SagaIterator {
  const { title, ...body } = action.payload
  const subject = `Report chyby - ${title}`
  try {
    yield call(api.sendEmail, subject, JSON.stringify(body))
  } catch (error) {
    // TODO asi vymyslet nejaky jednotny error handling idealne i s designem
  }
}

function* reportSaga(): SagaIterator {
  yield takeLatest(SUBMIT_REPORT_MODAL, handleSubmitReportModal)
}

export default reportSaga
