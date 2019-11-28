import uuid from 'uuid/v5';

export const getEntityIdHash = (id: string) => (
    uuid(id, uuid.URL)
)