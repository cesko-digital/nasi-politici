import { DefaultTheme } from 'styled-components';
import { createMuiTheme } from '@material-ui/core';

// Designers provides 4 colors for typography. This is wrong, should me 2 max.
const typographyColors = {
    primary: '#000000',
    secondary: '#404040',
    third: '#999999',
    fourd: '#1A1A1A'
};

export const theme = createMuiTheme();

const overrides = {
    MuiTypography: {
        h1: {
            fontFamily: 'Source Serif Pro',
            fontSize: '33px',
            lineHeight: 1.2,
            color: typographyColors.primary,
            fontWeight: 600,
            [theme.breakpoints.down('sm')]: {
                fontSize: '17px',
                lineHeight: 1.5,
                fontWeight: 600,
            },
        },
        h3: {
            fontFamily: 'Source Serif Pro',
            fontSize: '17px',
            lineHeight: 1.4,
            color: typographyColors.third,
            [theme.breakpoints.down('sm')]: {
               fontSize: '17px',
                lineHeight: 1.4,
            },
        }, 
        h4: {
            fontFamily: 'Source Serif Pro',
            fontSize: '17px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: typographyColors.secondary
        },
        caption: {
            fontFamily: 'Saira Condensed',
            fontSize: '21px',
            lineHeight: 1,
            color: typographyColors.fourd,
            fontWeight: 500,
            textTransform: 'uppercase',
            [theme.breakpoints.down('sm')]: {
                fontSize: '17px',
                lineHeight: 1,
             },
        },
        subtitle1: {
            fontFamily: 'Source Serif Pro',
            fontSize: '21px',
            lineHeight: 1.5,
            color: typographyColors.secondary
        },
        body1: {
            fontFamily: 'Source Serif Pro',
            fontSize: '17px',
            lineHeight: 1.4,
            color: typographyColors.secondary
        },
        body2: {
            fontFamily: 'Source Serif Pro',
            fontSize: '14px',
            lineHeight: 15,
            color: typographyColors.secondary
        }
    }
};

// @ts-ignore
export const DEFAULT_THEME: DefaultTheme = createMuiTheme({
    overrides
});

