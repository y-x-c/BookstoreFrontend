import DS from 'ember-data';

export default DS.Model.extend({
  auth_id: DS.attr('number'),
  authname: DS.attr('string'),
  intro: DS.attr('string'),
  books: DS.hasMany('book')
});
