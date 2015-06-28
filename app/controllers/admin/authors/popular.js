import Ember from 'ember';

export default Ember.Controller.extend({
  limit: 5,
  offset: 0,
  total: 0,
  actions: {
    updatePopularAuthors: function () {
      var self = this;
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');
      var start = moment(this.get('start')).startOf('day');
      start = start.format("YYYY-MM-DD HH:mm:ss");
      var end = moment(this.get('end')).endOf('day');
      end = end.format("YYYY-MM-DD HH:mm:ss");
      var url = [host, namespace, "authors/popular"].join('/');
      url += "?start=" + start + "&end=" + end;
      url += "&limit=" + this.get('limit') + "&offset=" + this.get('offset');

      Ember.$.getJSON(url).then(function (data) {
        var func = function () {
          var authors = self.store.pushMany('author', data.authors);
          authors.forEach(function (author) {
            author.set('sales', data.sales[author.get('id')]);
          });
          self.set('authors', authors);
        };

        self.set('total', data.meta.total);

        // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
        Ember.run.once(self, func);
      });
    },
  },

  rangeChanged: Ember.observer('start', 'end', function () {
    this.send('updatePopularAuthors');
  }),

  pagecount: Ember.computed("limit", "total", {
    get: function() {
      return Math.ceil(this.get('total') / this.get('limit'));
    }
  }),

  limitChanged: Ember.observer('limit', function() {
    this.send('updatePopularAuthors');
  }),

  offsetChanged: Ember.observer('offset', function() {
    this.send('updatePopularAuthors');
  })
});
