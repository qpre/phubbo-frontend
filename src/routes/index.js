import { addRoute, checkRoute, setDefaultHandler }  from '../utils/router.js';
import { yieldContainer }           from '../actions/router';
import { default as HomeLayout }    from '../containers/home';
import { default as DefaultLayout } from '../containers/404';
import SessionLoginLayout           from '../containers/session/login';
import {store}                      from '../store';

export function attachRoutes() {
  addRoute('', () => {
    // TODO: set some state here.
    store.dispatch(yieldContainer(HomeLayout));
  });

  addRoute('session/login', () => {
    // TODO: set some state here.
    store.dispatch(yieldContainer(SessionLoginLayout));
  });

  setDefaultHandler(() => {
    store.dispatch(yieldContainer(DefaultLayout));
  });

  checkRoute();
}
