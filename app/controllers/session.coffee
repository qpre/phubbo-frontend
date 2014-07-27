Phubo.SessionLoginController = Ember.ObjectController.extend({
  currentUser: null
  username: null
  password: null
  
  actions:
    login: () ->
      credentials = {username: @get('username'), password: @get('password')}
      
      Ember.$.post('http://phubo.herokuapp.com/session/login', credentials).then (data, status) =>
        if (status == 'success')
          Ember.$.get('http://phubo.herokuapp.com/session/current_user').then (data, status) =>
            if status == 'success'
              console.log "status: #{status} data: #{data}"
              if data then @set('current_user', data)
            else
              console.log "HTTP #{status}: something went wrong"
})