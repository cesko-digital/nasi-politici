import React from 'react';
import { getQueryParams } from '../../utils';

export const SearchResults = () => {
    const { query } = getQueryParams();
    return (
        <div>I am search results for { query }</div>
    );
}
