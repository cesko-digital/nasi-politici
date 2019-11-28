import React from 'react';
import Header from '../ui/shared/header';

import LocalizedStrings from 'react-localization';
import { Typography } from '@material-ui/core';
 
let strings = {
    heading:"O projektu",
    headingParagraph:"Analyzujeme korupci a snažíme se proti ní aktivně bojovat. Podívejte se na kauzy, které sledujeme, nebo na projekty a publikace, které připravujeme.",
    heading2:"Jaká témata řešíme?",
    heading2P1:"Zabýváme se korupcí ve všech jejích podobách a úrovních – od lokálních problémů až po ty s celonárodním dopadem. V naší práci nám můžete pomoct a korupci oznámit. Pokud máme dostatek podkladů, nemlčíme a jednáme.",
    heading2P2:"Děláme svoji práci, protože nám není jedno, jak česká společnost vypadá a funguje. Pokud vám to taky není jedno, ale nemáte zrovna čas vést vyšetřování, přispějte nám. Budeme bojovat i za vás.",
};

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
