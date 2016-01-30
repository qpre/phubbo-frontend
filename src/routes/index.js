import { addRoute, checkRoute, setDefaultHandler } from '../utils/router.js';
import { yieldContainer } from '../actions/router';
import { default as HomeLayout } from '../containers/home';
import { default as IndexLayout } from '../containers/index';
import { default as DefaultLayout } from '../containers/404';
import SessionLoginLayout from '../containers/session/login';
import { store } from '../store';
import { navigate } from '../utils/router';

function addSecuredRoute(path, handler) {
  addRoute(path, () => {
    let authState = store.getState();
    authState = authState ? authState.auth : null;

    if (authState && !authState.loggedIn) {
      navigate('session/login');
      return;
    }

    if (handler) { handler(); }
  });
}

export function attachRoutes() {
  addRoute('', () => {
    // TODO: set some state here.
    store.dispatch(yieldContainer(IndexLayout));
  });

  addSecuredRoute('me', () => {
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
