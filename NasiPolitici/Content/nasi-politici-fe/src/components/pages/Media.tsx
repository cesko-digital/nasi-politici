import React from 'react';

import { Typography } from '@material-ui/core';

let texts = {
    media: 'Pro médiá'
};

export const Media = () => {
    return (
        <div>
            <Typography variant="h1">{texts.media}</Typography>
        </div>
    );
};
