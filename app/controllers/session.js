import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  storedUsername: localStorage.username,
  userId: localStorage.userId,
  password: null,
  username: null,
  loginFailed: false,
  loginInProgress: false,
  token: localStorage.token,

  isLoggedIn: function () {
    return this.get('token') !== undefined;
  }.property('isLoggedIn'),

  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  usernameChanged: function() {
    localStorage.username = this.get('storedUsername');
  }.observes('storedUsername'),

  userIdChanged: function() {
    localStorage.userId = this.get('userId');
  }.observes('userId'),

  reset: function () {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  },

  resolveTransition: function () {
    var previousTransition;
    previousTransition = this.get('previousTransition');

    if (previousTransition) {
      this.set('previousTransition', null);
      previousTransition.retry();
    } else {
      this.transitionToRoute('dashboard.index');
    }
  },

  actions: {
    logout: function () {
      this.reset();
      return this.transitionToRoute('index');
    },

    login: function() {
      return Ember.$.post(config.SERVER_URL + '/session/login', {
        username: this.get('username'),
        password: this.get('password')
      }).then(((function(_this) {
        return function(data, textStatus, xhr) {
          var previousTransition;

          _this.set('loginInProgress', false);
          _this.set('token', data['token']);
          _this.set('userId', data['userId']);
          _this.set('storedUsername', data['username']);

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
