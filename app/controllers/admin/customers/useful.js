import Ember from 'ember';

export default Ember.Controller.extend({
  limit: 5,
  offset: 0,
  total: 0,

  actions: {
    updateCustomers: function () {
      var self = this;
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');
      var url = [host, namespace, "customers/useful"].join('/');
      var parameters = ["limit="+this.get('limit'), "offset="+this.get('offset')].join('&');
      url += "?" + parameters;

      Ember.$.getJSON(url).then(function (data) {
        var func = function () {
          var customers = self.store.pushMany('customer', data.customers);
          customers.forEach(function (customer) {
            customer.set('rating', data.ratings[customer.get('id')]);
          });
          self.set('customers', customers);
        };

        self.set('total', data.meta.total);
        // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
        Ember.run.once(self, func);
      });
    },
  },

  pagecount: Ember.computed("limit", "total", {
    get: function() {
      return Math.ceil(this.get('total') / this.get('limit'));
    }
  }),

  limitChanged: Ember.observer('limit', function() {
    this.send('updateCustomers'); // if I send 'search' from pagination-limit, results are wrong
  }),

  offsetChanged: Ember.observer('offset', function() {
    this.send('updateCustomers');
  })
});
