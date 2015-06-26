import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr("string"),
  name: DS.attr("string"),
  email: DS.attr("string"),
  phone: DS.attr("string"),
  orders: DS.hasMany("order", { async: true }),
  trusted: DS.attr("boolean")
});
