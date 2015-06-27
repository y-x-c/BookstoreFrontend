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

  askWhoAmI: function() {
    var self = this;
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var url = [host, namespace, "whoAmI"].join('/');

    Ember.$.getJSON(url).then(function(data) {
      var customer = self.store.push('customer', data.customer);

      self.set('customer', customer);
    }, function() {

    });
  }
});
