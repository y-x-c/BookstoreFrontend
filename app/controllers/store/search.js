import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['all'],

  actions: {
    search: function() {
      var keywords = this.get('keywords');

      console.log(keywords);

      this.set('model', this.store.find('book', {all: keywords}));
      this.transitionTo('store.search', {queryParams:{all : keywords}});
    }
  }
});
