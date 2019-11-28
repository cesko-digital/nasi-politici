import React from 'react';
import Header from '../ui/shared/header';

import LocalizedStrings from 'react-localization';
import { Typography } from '@material-ui/core';
 
let strings = {
  media:"Pro médiá",
 };

export const Media = () => {
    return (
        <div>
            <Header/>
            <Typography variant="h1">{strings.media}</Typography>
        </div>
    );
}
