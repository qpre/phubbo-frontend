import * as Router from './modules/Router/router';
import {ApplicationLayout} from './layouts/application';
import {initFBDriver} from './modules/Social/facebook';
import * as Data from './modules/Data/Store';

let appView = React.render(ApplicationLayout, document.body);

import UserPhotosLayout   from './layouts/user/photos';
import HomeLayout         from './layouts/user/home';
import IndexLayout        from './layouts/index/index';
import SessionLoginLayout from './layouts/session/login';

Router.addRoute('user/photos', () => {
  appView.yield(UserPhotosLayout);
});

Router.addRoute('', () => {
  appView.yield(HomeLayout);
});

Router.addRoute('session/login', () => {
  appView.yield(SessionLoginLayout);
});

Router.addRoute('index', () => {
  appView.yield(IndexLayout);
});

Router.checkRoute();

initFBDriver();
