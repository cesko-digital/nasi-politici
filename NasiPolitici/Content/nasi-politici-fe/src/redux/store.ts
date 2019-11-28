import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as APIReducer } from './api';

const store = createStore(
    combineReducers({
        api: APIReducer,
    }),
    applyMiddleware(thunk)
);

export default store;
