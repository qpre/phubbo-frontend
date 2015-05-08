import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function () {
    // return Ember.$.getJSON(config.SERVER_URL + '/users/' + this.controllerFor('session').get('userId'));
    return this.store.find('user', this.controllerFor('session').get('userId'));
  }
});
