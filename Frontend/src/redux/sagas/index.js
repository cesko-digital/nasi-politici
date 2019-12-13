import {all, fork} from 'redux-saga/effects'

import searchSaga from './search-saga'

const rootSaga = function * () {
	yield all([
		fork(searchSaga),
	])
}

export default rootSaga
