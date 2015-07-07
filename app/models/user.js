import DS from 'ember-data';

export default DS.Model.extend({
  name          : DS.attr('string'),
  password      : DS.attr('string'),
  email         : DS.attr('string'),
  authorizations: DS.hasMany('authorization', { async: true })
});
