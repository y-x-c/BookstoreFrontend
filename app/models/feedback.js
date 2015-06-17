import DS from 'ember-data';

export default DS.Model.extend({
  ISBN: DS.belongsTo('book', { async: true }),
  customer: DS.belongsTo('customer', { async: true }),
  score: DS.attr('number'),
  time: DS.attr('date'),
  comment: DS.attr('string'),
  usefulness: DS.attr('number')
});
