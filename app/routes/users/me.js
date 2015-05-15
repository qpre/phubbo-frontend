import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function() {
    return this.store.find('user', this.controllerFor('session').get('userId'));
  }
});
