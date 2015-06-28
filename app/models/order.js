import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('date'),
  customer: DS.belongsTo('customer', { async: true }),
  address: DS.attr('string'),
  totalPrice: DS.attr('number'),
  orderItems: DS.hasMany('orderItem')
});
