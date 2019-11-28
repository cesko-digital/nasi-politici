import React from 'react';
import { getQueryParams } from '../../utils';
import PoliticianCard from '../app/PoliticianCard/PoliticianCard';

const person = {
    id: 'miroslav-kalousek',
    firstName: 'Miroslav',
    lastName: 'Kalousek',
    description:
        'Miroslav Kalousek (*1960 ),poslanec (od 2013)  - Poslanecká sněmovna PČR (2013 - 2017)\nposlanec (od 2010 do 2013)  - Poslanecká sněmovna PČR (2010 - 2013). Miroslav Kalousek mezi roky 2014-17 sponzoroval TOP 09 v celkové výši 400 000  Kč. Nejvyšší sponzorský dar byl ve výši 300 000  Kč. ',
    birthDate: 1960,
    photoUrl: 'https://www.hlidacstatu.cz/Content/Img/personNoPhoto.png'
};

export const SearchResults = () => {
    const { query } = getQueryParams();
    return (
        <React.Fragment>
            <div>I am search results for {query}</div>
            <PoliticianCard person={person} />
        </React.Fragment>
    );
};
