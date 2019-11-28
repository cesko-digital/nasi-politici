import queryString from 'query-string';

export const getQueryParams = () => (
    queryString.parse(window.location.search)
);
