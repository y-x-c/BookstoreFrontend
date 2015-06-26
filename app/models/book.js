import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  subtitle: DS.attr('string'),
  price: DS.attr('number'),
  amount: DS.attr('number'),
  pubdate: DS.attr('date'),
  format: DS.attr('string'),
  keyword: DS.attr('string'),
  subject: DS.attr('string'),
  summary: DS.attr('string'),
  img: DS.attr('string'),
  publisher: DS.belongsTo('publisher', { async: true }),
  authors: DS.hasMany('author', { async: true }),
  feedbacks: DS.hasMany('feedback', { async: true }),
  suggestions: DS.hasMany('book', { async: true}),
});
