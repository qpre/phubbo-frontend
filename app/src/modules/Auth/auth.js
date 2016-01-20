import {post, getJSON} from '../../lib/network';
import {navigate} from '../Router/router';
import * as Store from '../../modules/Data/Store';

export function loggedIn() {
  // weak as fuck...
  return Store.get('auth:logged_in');
}

export function logIn(username, password) {
  return new Promise((resolve, reject) => {
    post('http://localhost:4080/api/auth/login', {
      username,
      password,
    }).then((data) => {
      Store.set('auth:logged_in', true);
      Store.set('user', data.data);
      resolve();
    }).catch((err) => {
      Store.set('auth:logged_in', false);
      reject(err);
    });
  });
}

export function logOut() {
  if (!Store.get('auth:logged_in')) {
    return;
  }

  getJSON('http://localhost:4080/api/auth/logout');
  Store.set('auth:logged_in', false);
  Store.set('user', null);
  navigate('session/login');
}
