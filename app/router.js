import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('Users', function() {});

  this.resource('session', function() {
    this.route('login');
    this.route('logout');
  });
  this.resource('dashboard', function () {
    this.route('index');
  });

  this.route('tos');
});

export default Router;
