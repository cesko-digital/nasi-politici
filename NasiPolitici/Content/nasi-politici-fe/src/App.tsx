import React from 'react';
import Router from './router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style';
import { MainLayout } from './components';
import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const App: React.FC = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <ThemeProvider theme={defaultTheme}>
                <MainLayout>
                    <Router />
                </MainLayout>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default App;
