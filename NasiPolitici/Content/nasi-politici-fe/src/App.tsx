import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import store from './redux/store';
import { Router } from './router';
import { GlobalStyle } from './style';
import { DEFAULT_THEME } from './theme';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <MuiThemeProvider theme={DEFAULT_THEME}>
          <ThemeProvider theme={DEFAULT_THEME}>
            <Router />
          </ThemeProvider>
        </MuiThemeProvider>
      </Provider>
    </React.Fragment>
    );
};

export default App;
