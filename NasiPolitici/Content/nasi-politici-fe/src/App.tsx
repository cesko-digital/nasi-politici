import React from 'react';
import Router from './router';
import { GlobalStyle } from './style';
const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router />
    </React.Fragment>
  );
}

export default App;
