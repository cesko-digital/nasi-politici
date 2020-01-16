import { createBrowserHistory, History } from 'history'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'

import {articlesReducer} from './articles/reducers'
import {demagogReducer} from './demagog/reducers'
import {detailReducer} from './detail/reducers'
import {reportReducer} from './report/reducers'
import {searchReducer} from './search/reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  articles: articlesReducer,
  demagog: demagogReducer,
  detail: detailReducer,
  report: reportReducer,
  search: searchReducer,
})

const rootReducer = createRootReducer(history)

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware()
	const store = createStore(
		createRootReducer(history),
		composeWithDevTools(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
	);
	sagaMiddleware.run(rootSaga)
  return store;
}
