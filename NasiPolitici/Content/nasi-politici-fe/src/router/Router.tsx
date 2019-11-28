import React from 'react';

import { BrowserRouter as ReactRouter, Switch, Route } from 'react-router-dom';
import {
    About,
    Media,
    Home,
    PersonDetail,
    SearchResults,
    MainLayout
} from '../components/pages';
import { getQueryParams } from '../utils';
import { ABOUT_ROUTE, MEDIA_ROUTE, POLITIC_DETAIL_ROUTE } from './routes';

const Router = () => {
    const { query } = getQueryParams();
    return (
        <ReactRouter>
            <Switch>
                <MainLayout>
                    <Route exact path={ABOUT_ROUTE}>
                        <About />
                    </Route>
                    <Route exact path={MEDIA_ROUTE}>
                        <Media />
                    </Route>
                    <Route exact path="/">
                        {query ? <SearchResults /> : <Home />}
                    </Route>
                    <Route path={`${POLITIC_DETAIL_ROUTE}/:id`}>
                        <PersonDetail />
                    </Route>
                </MainLayout>
            </Switch>
        </ReactRouter>
    );
};

export default Router;
