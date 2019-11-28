import { Entities } from './constants';
import sendRequest from './sendRequest';

interface ResolveApiEntityArgs {
    entity: Entities,
    id: string,
}

export const resolveAPIEntity = ({ entity, id }: ResolveApiEntityArgs) => {
    switch(entity) {
        case (Entities.SearchResult):
            const result = sendRequest(`/person/search/${id}`);
            return result;
        case (Entities.Person):
            return sendRequest(`/person/detail/${id}`)
    }
}

export default resolveAPIEntity;
