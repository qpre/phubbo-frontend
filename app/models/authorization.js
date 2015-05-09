import DS from 'ember-data';

export default DS.Model.extend({
  user_id:        DS.belongsTo('user', { async: true }),
  token:          DS.attr('string'),
  facebook_link:  DS.attr('string'),
  provider:       DS.attr('string'),
  uid:            DS.attr('string'),
  user_name:      DS.attr('string'),
  email:          DS.attr('string')
});
