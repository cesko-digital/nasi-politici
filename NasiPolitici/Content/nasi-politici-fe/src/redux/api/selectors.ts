import { pathOr } from 'ramda';
import { MODULE_NAME } from '.';

// @ts-ignore
export const getAPIData = (state, { entity,  id }) => (
    pathOr(null, [MODULE_NAME, entity, id], state)
)