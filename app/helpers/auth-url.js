import Ember from 'ember';
import config from '../config/environment';

export function authUrl(provider, userId) {
  debugger;
  let url = '' + config.SERVER_URL + '/auth/' + provider + '?uid=' + userId;

  return new Ember.Handlebars.SafeString("<a target='_blank' href="+ url +">Add "+provider+"</a>");
}

export default Ember.Handlebars.makeBoundHelper(authUrl);
