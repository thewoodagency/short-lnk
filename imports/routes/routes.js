/**
 * Created by jay on 3/28/17.
 */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

window.browserHistory = browserHistory;
//to test browserHistory with window object

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
    if (!!Meteor.userId()) {
        //browserHistory.push('/links'); //replace instead of push
        browserHistory.replace('/links');
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/');
    }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    console.log('isAuthenticated', isAuthenticated);

    if(isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/');
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage} />
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
        <Route path="*" component={NotFound} onEnter={onEnterPublicPage} />
    </Router>
);