import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  currentUser: null,
  username: null,
  password: null,
  loginFailed: false,
  loginInProgress: false,
  token: localStorage.token,

  isLoggedIn: function () {
    this.get('token') !== undefined
  },

  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  resolveTransition: function () {
    var previousTransition;
    previousTransition = this.get('previousTransition');

    if (previousTransition) {
      this.set('previousTransition', null);
      previousTransition.retry();
    } else {
      this.transitionToRoute('dashboard');
    }
  },

  actions: {
    login: function() {
      return Ember.$.post(config.SERVER_URL + '/session/login', {
        username: this.get('username'),
        password: this.get('password')
      }).then(((function(_this) {
        return function(data, textStatus, xhr) {
          var previousTransition;

          _this.set('loginInProgress', false);
          _this.set('isLoggedIn', true);
          _this.set('currentUser', data['user_id']);
          _this.set('token', data['token']);

          _this.resolveTransition();
        };
      })(this)), ((function(_this) {
        return function(response) {
          if (response.status === 401) {}
          _this.set('loginInProgress', false);
          _this.set('loginFailed', true);
          return _this.transitionToRoute('session.login');
        };
      })(this)));
    }
  }
}
);
