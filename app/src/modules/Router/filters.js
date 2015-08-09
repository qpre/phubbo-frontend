import * as Store from '../Data/store';
import {navigate} from '../Router/router';

/**
 * a user should not be able to access some routes without being authorized
 */
export function checkAuthorized () {
  if (Store.get('name') === undefined) {
    navigate('/');
  }
}
