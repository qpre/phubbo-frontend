import Ember from 'ember';

export default Ember.Controller.extend({
  currentMessage: null,
  queuedMessage:  null,

  queuedMessageChanged: function () {
    let currentMessage, queuedMessage;

    currentMessage  = this.get('currentMessage');
    queuedMessage   = this.get('queuedMessage');

    if (!currentMessage){
      this.now();
    }
  }.observes('queuedMessage'),

  now: function() {
    this.setProperties({
      queuedMessage:  null,
      currentMessage: this.get('queuedMessage')
    });
  },

  pushMessage: function (text, type) {
    let message;

    message = {
      text: text,
      type: type || 'success'
    };

    this.set('queuedMessage', message);
  },

  actions: {
    dismissFlashMessage: function() {
      this.set('currentMessage', null);
    }
  }

});
