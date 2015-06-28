import Ember from 'ember';

export default Ember.Controller.extend({
  limit: 5,
  offset: 0,
  total: 0,

  actions: {
    updateLatestOrders: function () {
      var self = this;
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');

      var url = [host, namespace, "orders/latest"].join('/');
      url += "?limit=" + this.get('limit') + "&offset=" + this.get('offset');

      var payload = Ember.$.getJSON(url).then(function (data) {
        var func = function () {
          var orders = self.store.pushMany('order', data.orders);

          self.set('orders', orders);

          this.set('total', data.meta.total);
        };

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
    this.send('updateLatestOrders'); // if I send 'search' from pagination-limit, results are wrong
  }),

  offsetChanged: Ember.observer('offset', function() {
    this.send('updateLatestOrders');
  })
});
