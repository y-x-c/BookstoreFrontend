import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  //customerId: Ember.computed.alias('controllers.application.customerId'),
  customer: Ember.computed.alias('controllers.application.customer'),
  actions: {
    logout: function() {
      this.set('customer', null);
      this.store.init();
    },
    search: function() {
      this.transitionToRoute('store.search', {queryParams:{all: this.get('keywords')}});
    }
  },

});
