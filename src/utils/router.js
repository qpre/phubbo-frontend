import UrlPattern from 'url-pattern';

export let currentRoute: ?string     = null;
export let defaultHandler: ?Function = null;

type Route = {
  path:         string,
  handler:      Function
}

const routes: Array<Route> = [];

export function setDefaultHandler(handler: Function) {
  defaultHandler = handler;
}

export function addRoute(path: string, handler: Function) {
  // register route
  const r: Route = { path, handler };

  routes.push(r);
}

export function removeRoute(path: string) {
  let t: Function;
  t = (r) => (r.path === path);

  routes.map((r) => {
    if (t(r)) {
      const i = routes.indexOf(r);
      if (i !== -1) { routes.splice(i, 1); }
    }
  });
}

function getHash() : string {
  return window.location.hash.replace('#', '');
}

function clearSlashes(str: string) : string {
  return str.toString().replace(/\$/, '').replace(/^\//, '');
}

export function checkRoute() {
  const curRoute: string = getHash();

  for (const route of routes) {
    let match = null;

    // URLPattern does not accept the empty string
    if (route.path === '') {
      match = (curRoute === '') ? '' : null;
    } else {
      let pattern;
      pattern = new UrlPattern(route.path);
      match   = pattern.match(curRoute);
    }

    if (match !== null) {
      console.info(`ROUTER: applying handler for ${route.path}`);

      currentRoute = route.path;
      route.handler.apply({}, [match]);

      return;
    }
  }

  if (defaultHandler) {
    currentRoute = null;
    defaultHandler();
  }

  return;
}

export function navigate(path: string = '') {
  window.history.pushState(null, null, `#${clearSlashes(path)}`);
  checkRoute();
}
