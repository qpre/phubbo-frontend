import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function () {
    this.store.find('user', this.controllerFor('session').get('userId'));
  }
});
