import { mergeDeepRight } from 'ramda';
import { FETCH_ENTITY_STARTED, FETCH_ENTITY_SUCCEEDED, FETCH_ENTITY_FAILED } from './actionTypes';

const INITIAL_STATE = {};

// @ts-ignore
const reducer = (state, { type, payload }) => {
    switch(type){
        case FETCH_ENTITY_STARTED:
            return mergeDeepRight(state, {
                [payload.entity]: {
                    [payload.id]: {
                        loading: true,
                        error: false,
                        data: null
                    }
                }
            });
        case FETCH_ENTITY_SUCCEEDED:
            return mergeDeepRight(state, {
                [payload.entity]: {
                    [payload.id]: {
                        loading: false,
                        error: false,
                        data: payload.data,
                    }
                }
            });
        case FETCH_ENTITY_FAILED:
            return mergeDeepRight(state, {
                [payload.entity]: {
                    [payload.id]: {
                        loading: false,
                        error: payload.error,
                        data: null,
                    }
                }
            });
        default:
            return INITIAL_STATE;
    }
}

export default reducer;
