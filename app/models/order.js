import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('date'),
  customer: DS.belongsTo('customer'),
  address: DS.belongsTo('address'),
  orderItems: DS.hasMany('orderItem')
});
