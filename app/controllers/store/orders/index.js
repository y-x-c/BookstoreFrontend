import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  customer: Ember.computed.alias('controllers.application.customer'),

  //customer: Ember.computed( {
  //  get: function() {
  //    return this.store.find('customer', 2);
  //  }
  //}),

  orders: Ember.computed('customer', {
    get: function() {
      return customer.orders;
    }
  }),




});
