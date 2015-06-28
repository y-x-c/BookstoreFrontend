import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    var customer = controller.get('customer');

    if(customer == null || !customer.get('admin')) this.transitionTo('store');
  }
});
