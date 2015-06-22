import DS from 'ember-data';

export default DS.Model.extend({
  order: DS.belongsTo('order'),
  book: DS.belongsTo('book', {async: true}),
  amount: DS.attr('number'),
  price: DS.attr('number')
});
