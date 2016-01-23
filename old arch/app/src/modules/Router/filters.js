import * as Store from '../Data/Store';
import {navigate} from '../Router/router';
import * as Auth from '../Auth/auth';

/**
 * a user should not be able to access some routes without being authorized
 */
export function authorized() {
  if (!Auth.loggedIn()) {
    navigate('session/login');
    return false;
  }

  return true;
}
