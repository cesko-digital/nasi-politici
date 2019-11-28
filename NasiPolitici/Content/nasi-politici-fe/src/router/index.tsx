import React from "react";
import {
  BrowserRouter as ReactRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Home, PoliticianDetail } from '../components/pages';

const Router = () => (
    <ReactRouter>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/detail/:id">
                <PoliticianDetail />
            </Route>
        </Switch>
    </ReactRouter>
)

export default Router;