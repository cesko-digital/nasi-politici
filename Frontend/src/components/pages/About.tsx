import React from 'react';
import strings from '../lang/strings';


export default class About extends React.Component{
    
    render () {
        return (
            <div className="container">
                <h1>{strings.aboutHeading}</h1>
                <p>{strings.aboutHeadingParagraph}</p>
                <h2>{strings.aboutHeading2}</h2>
                <p>{strings.aboutHeading2P1}</p>
                <p>{strings.aboutHeading2P2}</p>
            </div>
        );
    }
}
