import DS from 'ember-data';

export default DS.Model.extend({
  userName:       DS.attr('string'),
  authorizations: DS.hasMany('authorization', {async: true})
});
