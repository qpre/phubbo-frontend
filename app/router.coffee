Phubo.Router.map(() ->
  @resource 'session', {path: '/session' }, () ->
    @route 'login'
    @route 'logout'
  @resource 'users', {path: '/users' }, () ->
    @route 'user', {path: '/users/:user_id'}
)
  