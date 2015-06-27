import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['all'],

  limit: 5,
  offset: 0,

  actions: {
    search: function() {
      var keywords = this.get('keywords');
      var orderBy = this.get('orderBy') + this.get('sortBy');
      var self = this;

      if(!keywords) return;

      this.store.find('book', {
        all: keywords,
        orderBy: orderBy,
        limit: self.get('limit'),
        offset: self.get('offset'),
      }).then(function(books) {
        self.set('model', books);
      });
    },

    sortByYr: function() {
      this.set('sortBy', 0);
      this.set('offset', 0);
    },

    sortByFb: function() {
      this.set('sortBy', 2);
      this.set('offset', 0);
    },

    sortByTFb: function() {
      this.set('sortBy', 4);
      this.set('offset', 0);
    },

    descent: function() {
      this.set('orderBy', 1);
      this.set('offset', 0);
    },

    ascent: function() {
      this.set('orderBy', 0);
      this.set('offset', 0);
    }
  },

  sortBy: 0,
  sortByYr: true,
  orderBy: 1,
  descent: true,

  sortByChanged: Ember.observer('sortBy', function() {
    var sortBy = this.get('sortBy');
    this.set('sortByYr', sortBy === 0);
    this.set('sortByFb', sortBy === 2);
    this.set('sortByTFb', sortBy === 4);

    this.send('search');
  }),

  orderByChanged: Ember.observer('orderBy', function() {
    var orderBy = this.get('orderBy');
    this.set('descent', orderBy === 1);
    this.set('ascent', orderBy === 0);

    this.send('search');
  }),

  total: Ember.computed("model", {
    get: function() {
      return this.get('model.meta.total') || 0;
    }
  }),

  pagecount: Ember.computed("limit", "total", {
    get: function() {
      return Math.ceil(this.get('total') / this.get('limit'));
    }
  }),

  limitChanged: Ember.observer('limit', function() {
      this.send('search'); // if I send 'search' from pagination-limit, results are wrong
  }),

  keywordsChanged: Ember.observer('keywords', function() {
    this.send('search');
  })


});
