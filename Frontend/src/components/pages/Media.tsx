import React from 'react';
import strings from '../lang/strings';


export default class Media extends React.Component{
    
    render () {
        return (
            <div className="container">
                <h1>{strings.mediaHeading}</h1>
                <p>{strings.mediaTopParagraph}</p>
            </div>
        );
    }
}
