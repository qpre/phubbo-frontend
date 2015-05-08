import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  needs:    ['session'],
  username: Ember.computed.alias("controllers.session.username"),
  userId:   Ember.computed.alias("controllers.session.userId"),

  actions: {
    addFacebookAuth: function (user_id) {
      var self = this;
      FB.login(function(response) {
        if (response.authResponse) {
          Ember.$.get(config.SERVER_URL + '/auth/facebook/callback',{
            signed_request: response.authResponse.signedRequest,
            user_id: self.get('userId')
          }, function(json) {
            console.log(json);
          });
        }
      })
    }
  }
});
