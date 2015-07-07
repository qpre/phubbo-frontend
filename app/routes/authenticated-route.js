import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function (transition) {
    if (!this.controllerFor('session').get('isLoggedIn')) {
      let loginController = this.controllerFor('session');

      loginController.set('previousTransition', transition);
      this.transitionTo('session.login');
    }
  }
});
