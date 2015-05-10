import Ember from 'ember';

export default Ember.Controller.extend({
  username:         '',
  password:         '',
  confPassword:     '',

  submitBtnClass:     'default',
  usernameFieldClass: 'inactive',
  passwordFieldClass: 'inactive',

  isUsernameValid:  false,
  isPasswordValid:  false,

  errorMessage:     null,

  usernameChanged: function () {
    this.set('isUsernameValid', true);
  }.observes('username'),

  passwordChanged: function () {
    if (this.get('password') === this.get('confPassword')) {
      this.set('isPasswordValid', true);
    } else {
      this.set('isPasswordValid', false);
    }
  }.observes('password', 'confPassword'),

  isUsernameValidChanged: function () {
    let klass = 'error';

    if (this.get('isUsernameValid')) {
      klass = 'success';
      this.set('errorMessage', null);
    } else {
      this.set('errorMessage', 'Your username is invalid');
    };

    this.set('usernameFieldClass', klass);
  }.observes('isUsernameValid'),

  isPasswordValidChanged: function () {
    let klass = 'error';

    if (this.get('isPasswordValid')) {
      klass = 'success';
      this.set('errorMessage', null);
    } else {
      this.set('errorMessage', 'Your password and its confirmation should match');
    };

    this.set('passwordFieldClass', klass);
  }.observes('isPasswordValid'),

  isValid: function () {
    if (this.get('isUsernameValid') && this.get('isPasswordValid')) {
      this.set('submitBtnClass', 'success');
      return true;
    } else {
      this.set('submitBtnClass', 'default');
      return false;
    }
  }.observes('isUsernameValid', 'isPasswordValid').property('isValid').volatile(),

  actions: {
    register: function () {
      if (this.get('isValid')) {

      }
    }
  }
});
