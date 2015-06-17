import DS from 'ember-data';

export default DS.Model.extend({
  order: DS.belongsTo('order'),
  isbn: DS.belongsTo('book'),
  amount: DS.attr('number'),
  price: DS.attr('number')
});
