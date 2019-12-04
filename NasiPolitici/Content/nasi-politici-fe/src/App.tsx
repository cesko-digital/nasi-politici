import React from 'react';
import { Router } from './router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { DEFAULT_THEME } from './theme';

const App: React.FC = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <MuiThemeProvider theme={DEFAULT_THEME}>
                <ThemeProvider theme={DEFAULT_THEME}>
                    <Router />
                </ThemeProvider>
            </MuiThemeProvider>
    </React.Fragment>
    );
};

export default App;
