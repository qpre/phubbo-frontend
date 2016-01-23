import {publish, subscribe} from '../Notifier/notifier';
import UrlPattern from 'url-pattern';

export let currentRoute: ?string = null;

type Route = {
  path:         string,
  handler:      Function
}

let routes: Array<Route> = [];

export function addRoute(path: string, handler: Function) {
  // register route
  let r: Route = { path, handler };

  routes.push(r);
}

export function removeRoute(path: string) {
  let t: Function;
  t = (r) => { return (r.path === path); };

  routes.map((r) => {
    if (t(r)) {
      let i = routes.indexOf(r);
      (i !== -1) && routes.splice(i, 1);
    }
  });
}

function getHash() : string {
  return window.location.hash.replace('#', '');
}

function clearSlashes(string: string='') : string {
  return string.toString().replace(/\$/, '').replace(/^\//, '');
}

export function checkRoute() {
  let curRoute: string = getHash();

  for (let route of routes) {
    let match = null;

    // URLPattern does not accept the empty string
    if (route.path == '') {
      match = (curRoute == '') ? '' : null;
    } else {
      let pattern;
      pattern = new UrlPattern(route.path);
      match   = pattern.match(curRoute);
    }

    if (match != null) {
      console.info(`ROUTER: applying handler for ${route.path}`);
      currentRoute = route.path;
      route.handler.apply({}, [match]);
      publish('route:changed', currentRoute);

      return;
    }
  }
}

export function navigate(path: string='') {
  window.history.pushState(null, null, '#' + clearSlashes(path));
  checkRoute();
}
