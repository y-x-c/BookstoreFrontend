import DS from 'ember-data';

export default DS.Model.extend({
  p_id: DS.attr(),
  pubname: DS.attr('string'),
  books: DS.hasMany('book')
});
