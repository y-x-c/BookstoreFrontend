import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['all', 'orderBy'],

  actions: {
    search: function() {
      var keywords = this.get('keywords');

      this.set('model', this.store.find('book', {
        all: keywords,
        orderBy: this.get('sortBy') + this.get('orderBy')
      }));
      this.transitionTo('store.search', {queryParams:{all : keywords}});
    },

    sortByYr: function() {
      this.set('sortBy', 0);
    },

    sortByFb: function() {
      this.set('sortBy', 2);
    },

    sortByTFb: function() {
      this.set('sortBy', 4);
    },

    descent: function() {
      this.set('orderBy', 1);
    },

    ascent: function() {
      this.set('orderBy', 0);
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
  })


});
