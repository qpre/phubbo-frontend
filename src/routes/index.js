import { addRoute, checkRoute } from '../lib/router.js';
import { yieldContainer }       from '../actions/router';
import { default as Dummy }     from '../containers/dummy';
import { default as Dumb }      from '../containers/dumb';
import {store}                  from '../store';

export function attachRoutes() {
  addRoute('/dummy', () => {
    // TODO: set some state here.
    store.dispatch(yieldContainer(Dummy));
  });

  addRoute('/dumb', () => {
    // TODO: set some state here.
    store.dispatch(yieldContainer(Dumb));
  });

  checkRoute();
}
