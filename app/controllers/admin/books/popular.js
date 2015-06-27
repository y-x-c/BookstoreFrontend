import Ember from 'ember';

export default Ember.Controller.extend({
  limit: 5,
  offset: 0,
  total: 0,

  actions: {
    updatePopularBooks: function () {
      var self = this;
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');

      var start = moment(this.get('start')).startOf('day');
      start = start.format("YYYY-MM-DD HH:mm:ss");
      var end = moment(this.get('end')).endOf('day');
      end = end.format("YYYY-MM-DD HH:mm:ss");

      var url = [host, namespace, "books/popular"].join('/');
      url += "?start=" + start + "&end=" + end;
      url += "&limit=" + this.get('limit') + "%offset=" + this.get('offset');

      var payload = Ember.$.getJSON(url).then(function (data) {
        var func = function () {
          data.books.forEach(function (book) {
            book = self.store.normalize('book', book);
          });

          var books = self.store.pushMany('book', data.books);
          books.forEach(function (book) {
            book.set('sales', data.sales[book.get('id')]);
          });
          self.set('books', books);

          this.set('total', data.meta.total);
        };

        // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
        Ember.run.once(self, func);
      });
    },
  },

  rangeChanged: Ember.observer('start', 'end', function () {
    this.send('updatePopularBooks');
  }),

  pagecount: Ember.computed("limit", "total", {
    get: function() {
      return Math.ceil(this.get('total') / this.get('limit'));
    }
  }),

  limitChanged: Ember.observer('limit', function() {
    this.send('updatePopularBooks'); // if I send 'search' from pagination-limit, results are wrong
  }),

  offsetChanged: Ember.observer('offset', function() {
    this.send('updatePopularBooks');
  })
});
