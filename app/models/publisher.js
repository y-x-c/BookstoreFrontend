import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  intro: DS.attr('string'),
  books: DS.hasMany('book', { async: true })
});
