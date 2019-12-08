import React from 'react';
import About from './components/pages/About';
import Media from './components/pages/Media';
import Main from './components/pages/Main';
import Person from './components/pages/Person';
import Navigation from './components/pages/Navigation';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const App: React.FC = () => {
  return (
    <div className="">
      <Navigation/>
      <Router>
          <Switch>
            <Route path="/o-projektu.html">
              <About />
            </Route>
            <Route path="/pro-media.html">
              <Media />
            </Route>
            <Route path="/politik.html">
              <Person />
            </Route>
            <Route path="/">
              <Main />
            </Route>
            <Route path="/search.html">
              <Main />
            </Route>
          </Switch>
      </Router>      
    </div>
  );
}

export default App;
