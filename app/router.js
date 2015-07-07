import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('users', function () {
    this.route('me');
    this.route('user', { path: '/:id' });
  });


  this.resource('session', function () {
    this.route('login');
    this.route('logout');
    this.route('register');
  });
  this.resource('dashboard', function () {
    this.route('index');
  });

  this.route('tos');
  this.route('authorizations', function () {
    this.route('authorization', {path: '/:authorization_id'});
  });
});

export default Router;
