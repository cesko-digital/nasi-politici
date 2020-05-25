import { createBrowserHistory, History } from 'history'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import ReactGA from 'react-ga'

import { articlesReducer } from './articles/reducers'
import { demagogReducer } from './demagog/reducers'
import { detailReducer } from './detail/reducers'
import { reportReducer } from './report/reducers'
import { searchReducer } from './search/reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    articles: articlesReducer,
    demagog: demagogReducer,
    detail: detailReducer,
    report: reportReducer,
    search: searchReducer,
  })

const rootReducer = createRootReducer(history)

const trackPage = (page: string): void => {
  ReactGA.pageview(page)
}

let currentPage = ''

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
const gaTrackingMiddleware = () => (next: (action: any) => void) => (action: any) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.location.pathname}${action.payload.location.search}`
    if (currentPage !== nextPage) {
      currentPage = nextPage
      trackPage(nextPage)
    }
  }
  return next(action)
}

export type AppState = ReturnType<typeof rootReducer>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  let middlewares = [routerMiddleware(history), sagaMiddleware]
  if (process.env.REACT_APP_GA) {
    ReactGA.initialize(process.env.REACT_APP_GA)
    middlewares = [...middlewares, gaTrackingMiddleware]
  }
  const store = createStore(createRootReducer(history), composeWithDevTools(applyMiddleware(...middlewares)))
  sagaMiddleware.run(rootSaga)
  return store
}
