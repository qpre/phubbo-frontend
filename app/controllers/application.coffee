Phubo.ApplicationController = Ember.Controller.extend
  needs: ['session']

  currentUser: ( ->
    @get 'controllers.session.currentUser'
    ).property 'controllers.session.currentUser'

  isAuthenticated: (->
    !Ember.isEmpty this.get 'controllers.session.currentUser'
    ).property 'controllers.session.currentUser'
