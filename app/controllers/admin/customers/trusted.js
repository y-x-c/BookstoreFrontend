import Ember from 'ember';

export default Ember.Controller.extend({
  updateCustomers: function() {
    var self = this;
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var url = [host, namespace, "customers/trusted"].join('/');
    var parameters = [].join('&');
    url += "?" + parameters;

    Ember.$.getJSON(url).then(function(data) {
      var func = function(){
        var customers = self.store.pushMany('customer', data.customers);
        customers.forEach(function(customer) {
          customer.set('score', data.scores[customer.get('id')]);
        });
        self.set('customers', customers);
      };

      // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
      Ember.run.once(self, func);
    });
  }
});
