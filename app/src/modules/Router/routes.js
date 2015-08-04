import UserPhotosLayout from '../../layouts/user/photos';
import UserMeLayout from '../../layouts/user/me';
import IndexLayout from '../../layouts/index/index';
import SessionLoginLayout from '../../layouts/session/login';
import {appView} from '../../application';

export let SiteMap = [
  {
    route:    'user/photos',
    handler:  () => {
      appView.yield(UserPhotosLayout);
    }
  },

  {
    route:    'user/me',
    handler:  () => {
      appView.yield(UserMeLayout);
    }
  },

  {
    route:    'session/login',
    handler:  () => {
      appView.yield(SessionLoginLayout);
    }
  },

  {
    route:    '',
    handler:  () => {
      appView.yield(IndexLayout);
    }
  }
]
