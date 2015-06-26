import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  customer: Ember.computed.alias('controllers.application.customer'),

  actions: {
    confirm: function() {
      this.transitionToRoute('store.cart.confirm');
    }
  },

  cart: Ember.computed('customer', {
    get: function () {
      return this.store.find('cart', {customer: this.get('customer.id')});
    }
  })
});
