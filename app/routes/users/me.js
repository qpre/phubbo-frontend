import AuthenticatedRoute from '../authenticated-route';

export default AuthenticatedRoute.extend({
  model: function () {
    this.store.find('user', localStorage.userId);
  }
});
