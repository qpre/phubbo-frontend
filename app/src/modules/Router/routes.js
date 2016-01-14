import UserPhotosLayout from '../../layouts/user/photos';
import HomeLayout from '../../layouts/user/home';
import IndexLayout from '../../layouts/index/index';
import SessionLoginLayout from '../../layouts/session/login';
import {appView} from '../../application';

export let SiteMap = [
  {
    route:    'user/photos',
    handler:  () => {
      appView.yield(UserPhotosLayout);
    },
  },

  {
    route:    '',
    handler:  () => {
      appView.yield(HomeLayout);
    },
  },

  {
    route:    'session/login',
    handler:  () => {
      appView.yield(SessionLoginLayout);
    },
  },

  {
    route:    'index',
    handler:  () => {
      appView.yield(IndexLayout);
    },
  },
];
