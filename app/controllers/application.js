import Ember from 'ember';

export default Ember.Controller.extend({
  customer: null,

  customerChanged: Ember.observer('customer', function() {
    var feedbacks = this.store.all('feedback');

    feedbacks.forEach(function(feedback) {
      feedback.reload();
    });

    this.store.find('cart', {customer: this.get('customer.id')});
  }),
});
