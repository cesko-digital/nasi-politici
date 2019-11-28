import React from 'react';

import { Typography } from '@material-ui/core';
 
const texts = {
    aboutProject:"O projektu",
    description:"Analyzujeme korupci a snažíme se proti ní aktivně bojovat. Podívejte se na kauzy, které sledujeme, nebo na projekty a publikace, které připravujeme.",
    heading2:"Jaká témata řešíme?",
    heading2P1:"Zabýváme se korupcí ve všech jejích podobách a úrovních – od lokálních problémů až po ty s celonárodním dopadem. V naší práci nám můžete pomoct a korupci oznámit. Pokud máme dostatek podkladů, nemlčíme a jednáme.",
    heading2P2:"Děláme svoji práci, protože nám není jedno, jak česká společnost vypadá a funguje. Pokud vám to taky není jedno, ale nemáte zrovna čas vést vyšetřování, přispějte nám. Budeme bojovat i za vás.",
};

export const About = () => {
    return (
        <div>
            <Typography variant="h1">{texts.aboutProject}</Typography>
            <Typography variant="body1">{texts.description}</Typography>
            <Typography variant="h2">{texts.heading2}</Typography>
            <Typography variant="body1">{texts.heading2P1}</Typography>
            <Typography variant="body1">{texts.heading2P2}</Typography>
        </div>
    );
}
