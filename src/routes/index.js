import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import { default as HomeLayout } from '../containers/home';
import { default as IndexLayout } from '../containers/index';
import { default as DefaultLayout } from '../containers/404';

import UserAccounts from '../components/user/accounts';
import { default as UserPhotos } from '../components/user/photos/index';

import SessionLoginLayout from '../containers/session/login';
import { default as ApplicationLayout } from '../containers/Application';

export default (
  <Route path="/" component={ApplicationLayout}>
    <IndexRoute component={IndexLayout} />

    <Route path='/404' component={DefaultLayout} />

    <Route path="/session/login" component={SessionLoginLayout}/>

    <Route path="/me" component={HomeLayout}>
      <IndexRoute component={UserPhotos} />
      <Route path='accounts' component={UserAccounts}/>
      <Route path='photos' component={UserPhotos}/>
    </Route>
    <Redirect from='*' to='/404' />
  </Route>
);
