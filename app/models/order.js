import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('date'),
  customer: DS.belongsTo('customer'),
  address: DS.attr('string'),
  orderItems: DS.hasMany('orderItem')
});
