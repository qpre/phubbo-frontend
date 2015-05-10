import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  username:     localStorage.username,
  userId:       localStorage.userId,
  token:        localStorage.token,

  isLoggedIn:         function () {
    return (this.get('token') !== undefined) && (this.get('token') !== null);
  }.property('token'),

  tokenChanged:       function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  usernameChanged:    function() {
    localStorage.username = this.get('username');
  }.observes('username'),

  userIdChanged:      function() {
    localStorage.userId = this.get('userId');
  }.observes('userId'),

  reset:              function () {
    this.set('token'    , null);
    this.set('username' , null);
    this.set('userId'   , null);

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  },

  resolveTransition:  function () {
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
    logout:   function () {
      Ember.$.post(config.SERVER_URL + '/session/logout', {
        token: this.get('token')
      });
      this.reset();
      return this.transitionToRoute('index');
    },

    login:    function() {
      return Ember.$.post(config.SERVER_URL + '/session/login', {
        username: this.get('username'),
        password: this.get('password')
      }).then(((function(_this) {
        return function(data) {
          _this.set('token',            data['token']);
          _this.set('userId',           data['userId']);
          _this.set('username',         data['name']);

          _this.resolveTransition();
        };
      })(this)), ((function(_this) {
        return function(response) {
          if (response.status === 401) {}
          return _this.transitionToRoute('session.login');
        };
      })(this)));
    }
  }
}
);
