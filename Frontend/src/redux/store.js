import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import rootSaga from './sagas'
import createRootReducer from "./reducers";

// create the saga middleware
export const history = createBrowserHistory()

export default () => {
	const sagaMiddleware = createSagaMiddleware()
	const store = createStore(
		createRootReducer(history),
		composeWithDevTools(applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )),
	);
	sagaMiddleware.run(rootSaga)
	return store
}
