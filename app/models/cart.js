import DS from 'ember-data';

export default DS.Model.extend({
  book: DS.belongsTo('book', {async: true}),
  amount: DS.attr('number'),
  customer: DS.belongsTo('customer')
});
