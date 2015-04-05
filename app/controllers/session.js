import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  username: null,
  password: null,
  loginFailed: false,
  loginInProgress: false,
  isLoggedIn: false,

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
      return Ember.$.post('http://localhost:9393/session/login', {
        username: this.get('username'),
        password: this.get('password')
      }).then(((function(_this) {
        return function(data, textStatus, xhr) {
          var previousTransition;

          _this.set('loginInProgress', false);
          _this.set('isLoggedIn', true);
          _this.set('currentUser', data['user_id'])

          _this.resolveTransition()
        };
      })(this)), ((function(_this) {
        return function(response) {
          if (response.status === 401) {};
          _this.set('loginInProgress', false);
          _this.set('loginFailed', true);
          return _this.transitionToRoute('session.login');
        };
      })(this)));
    }
  }
}
);
