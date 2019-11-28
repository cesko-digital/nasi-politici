import React from "react";

import {
  BrowserRouter as ReactRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Home, PoliticianDetail, SearchResults } from '../components/pages';
import { getQueryParams } from '../utils';

const Router = () => {
    const { query } = getQueryParams();
    return (
        <ReactRouter>
            <Switch>
                <Route exact path="/">
                    {query
                        ? (
                            <SearchResults />
                        )
                        : (
                            <Home />
                        )
                    }
                </Route>
                <Route path="/detail/:id">
                    <PoliticianDetail />
                </Route>
            </Switch>
        </ReactRouter>
    )
}

export default Router;