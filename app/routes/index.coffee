Phubo.IndexRoute = Ember.Route.extend
  model: ->
    users = @store.findAll('user')
    console.log users
    users