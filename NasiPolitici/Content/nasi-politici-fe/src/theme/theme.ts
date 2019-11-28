import { DefaultTheme } from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import { Palette } from "@material-ui/core/styles/createPalette";
import black from '@material-ui/core/colors';

// Designers provides 4 colors for typography. This is wrong, should me 2 max.
const typographyColors = { primary: '#000000', secondary: '#404040', third: '#999999', fourd: '#1A1A1A'}

const overrides = {
    MuiTypography: {
        h1: {
            fontFamily: 'Source Serif Pro',
            fontSize: '33px',
            lineHeight: 1.2,
            color: typographyColors.primary,
            fontWeight: 600,
        },
        h3: {
            fontFamily: 'Source Serif Pro',
            fontSize: '17px',
            lineHeight: 1.4,
            color: typographyColors.third,
        },
        h4: {
            fontFamily: 'Source Serif Pro',
            fontSize: '17px',
            fontWeight: 700,
            lineHeight: 1.4,
            color: typographyColors.secondary,
        },
        caption: {
            fontFamily: 'Saira Condensed',
            fontSize: '21px',
            lineHeight: 1,
            color: typographyColors.fourd,
            fontWeight: 500,
        },
        subtitle1: {
            fontFamily: 'Source Serif Pro',
            fontSize: '21px',
            lineHeight: 1.5,
            color: typographyColors.secondary,
        },
        body1: {
            fontFamily: 'Source Serif Pro',
            fontSize: '17px',
            lineHeight: 1.4,
            color: typographyColors.secondary,
        },
        body2: {
            fontFamily: 'Source Serif Pro',
            fontSize: '14px',
            lineHeight: 15,
            color: typographyColors.secondary,
        }
    }
}

export const DEFAULT_THEME: DefaultTheme = createMuiTheme({
    overrides,
});
 