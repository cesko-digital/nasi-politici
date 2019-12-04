import { resolveAPIEntity, Entities } from '../../api';
import { FETCH_ENTITY_STARTED, FETCH_ENTITY_SUCCEEDED, FETCH_ENTITY_FAILED } from './actionTypes';
import { Dispatch } from 'redux';

interface fetchAPIArgs {
    entity: Entities;
    id: string;
}

export const fetchAPI = ({ entity, id }: fetchAPIArgs) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: FETCH_ENTITY_STARTED,
            payload: {
                entity,
                id
            }
        });

        resolveAPIEntity({ entity, id }).then(data => {
            dispatch({
                type: FETCH_ENTITY_SUCCEEDED,
                payload: {
                    entity,
                    id,
                    data,
                }
            });
        }).catch(error => {
            dispatch({
                type: FETCH_ENTITY_FAILED,
                payload: {
                    entity,
                    id,
                    error,
                }
            });
        });
    }
};
