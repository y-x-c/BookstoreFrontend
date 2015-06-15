import DS from 'ember-data';

export default DS.Model.extend({
  ISBN: DS.attr('string'),
  title: DS.attr('string'),
  subtitle: DS.attr('string'),
  price: DS.attr('number'),
  amount: DS.attr('number'),
  pubdate: DS.attr('date'),
  format: DS.attr('string'),
  keyword: DS.attr('string'),
  subject: DS.attr('string'),
  summary: DS.attr('string'),
  publisher: DS.belongsTo('publisher'),
  authors: DS.hasMany('author')
});
