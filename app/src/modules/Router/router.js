import {publish, subscribe} from '../Notifier/notifier';
import {SiteMap} from './routes';

let routes            = [];
let root              = '';
export let currentRoute   = null;

function onLocationHashChange () {
  let hash = window.location.hash;

  // early return if the hash has not changed
  if (window.location.hash === currentRoute) { return; }

  // this is our current state
  currentRoute = hash;

  // do we have any handler for this route ?
  checkHashRoute(currentRoute);
};

function checkHashRoute (hash=null) {
  // of no hash was found, get the current fragment
  let fragment = (hash !== null) ? hash : getFragment();

  // check if a route fits the current hash
  for (let route of routes) {
    let match = fragment.match(route.re);

    // it's match !
    if (match) {
      match.shift();
      // proceed with route's handler
      route.handler.apply({}, match);
      publish('router:changed', currentRoute);
      // early return, we don't want to keep on matching
      return;
    }
  }
}

export function navigate (path) {
  // defaulting path to root
  path = path || root;

  window.location.href.match(/#(.*)$/);
  window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
}

export function addRoute (re, handler, root) {
  // filtering '' as root path, that might match with every other one
  if (re === '') {
    re = /^\s*$/;
  }

  // register route
  routes.push({re: re, handler: handler});

  // is it the root route ? (<- try on reading this without laughing !)
  if (root) {
    root = re;
  }
}

export function removeRoute ({re, handler}) {
  let t;

  if (handler !== undefined) {
    t = (r) => { return (r.handler == handler); }
  }

  if (re !== undefined) {
    t = (r) => { return (r.re.toString() === re.toString()); }
  }

  routes.map((r) => {
    if (t(r)) {
      let i = routes.indexOf(r);
      (i !== -1) && routes.splice(i, 1);
    }
  })
}

export function flushRoutes () {
  routes  = [];
  root    = '/';
}

export function initRouter () {
  // Adding default routes
  for (let r of SiteMap) {
    addRoute(r.route, r.handler);
  }

  // observing hashchange event
  window.addEventListener('hashchange', () => {
    onLocationHashChange();
  });

  // starting the router upon page load
  window.addEventListener('load', () => {
    onLocationHashChange();
  });
};

export function getFragment () {
  let match = window.location.href.match(/#(.*)$/);

  return clearSlashes(match ? match[1] : '');
}

export function clearSlashes (string) {
  string.toString().replace(/\$/, '').replace(/^\//, '');
}
