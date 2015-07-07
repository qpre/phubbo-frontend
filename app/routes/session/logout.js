import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'session',

  beforeModel: function () {
    let sessionController = this.controllerFor('session');
    sessionController.send('logout');
  }
});
