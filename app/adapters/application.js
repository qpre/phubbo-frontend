import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.SERVER_URL,

  headers: function() {
    return {
      'PHUBO_AUTH_TOKEN': this.get('session.token') || localStorage.getItem('token')
    };
  }.property()
});
