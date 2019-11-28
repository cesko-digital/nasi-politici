import React from 'react';
import Header from '../ui/shared/header';

import LocalizedStrings from 'react-localization';
import { Typography } from '@material-ui/core';
 
let strings = new LocalizedStrings({
 en:{
    heading:"About the project",
    headingParagraph:"We analyze corruption and try to actively fight it. Look at the cases we follow or the projects and publications we are preparing.",
    heading2:"What topics do we address?",
    heading2P1:"We deal with corruption in all its forms and levels - from local problems to those with a national impact. In our work, you can help us and report corruption. If we have sufficient data, we do not silence and act.",
    heading2P2:"We do our work because we do not care how the Czech society looks and works. If you don’t care, but don’t have time to investigate, donate. We will fight for you as well.",
},
 cs: {
    heading:"O projektu",
    headingParagraph:"Analyzujeme korupci a snažíme se proti ní aktivně bojovat. Podívejte se na kauzy, které sledujeme, nebo na projekty a publikace, které připravujeme.",
    heading2:"Jaká témata řešíme?",
    heading2P1:"Zabýváme se korupcí ve všech jejích podobách a úrovních – od lokálních problémů až po ty s celonárodním dopadem. V naší práci nám můžete pomoct a korupci oznámit. Pokud máme dostatek podkladů, nemlčíme a jednáme.",
    heading2P2:"Děláme svoji práci, protože nám není jedno, jak česká společnost vypadá a funguje. Pokud vám to taky není jedno, ale nemáte zrovna čas vést vyšetřování, přispějte nám. Budeme bojovat i za vás.",
}
});

export const About = () => {
    return (
        <div>
            <Header/>
            <Typography variant="h1">{strings.heading}</Typography>
            <Typography variant="body1">{strings.headingParagraph}</Typography>
            <Typography variant="h2">{strings.heading2}</Typography>
            <Typography variant="body1">{strings.heading2P1}</Typography>
            <Typography variant="body1">{strings.heading2P2}</Typography>
        </div>
    );
}
