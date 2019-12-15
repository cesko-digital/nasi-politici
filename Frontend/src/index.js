import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import setupStore, {history} from './redux/store'
import { ConnectedRouter } from 'connected-react-router'

const store = setupStore()

ReactDOM.render(
	<Provider store={store}>
  <ConnectedRouter history={history}>
    <App />
  </ConnectedRouter>
	</Provider>,
	document.getElementById('root'));

serviceWorker.unregister();
