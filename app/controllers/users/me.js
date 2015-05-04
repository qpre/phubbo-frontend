import Ember from 'ember';

export default Ember.Controller.extend({
  needs:    ['session'],
  username: Ember.computed.alias("controllers.session.username"),
  userId:   Ember.computed.alias("controllers.session.userId"),
});
