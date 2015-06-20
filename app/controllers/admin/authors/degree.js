import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    query: function() {
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');
      var url = [host, namespace, "authors/degree"].join('/');
      url += "?author1=" + this.get('author1').get('id') + "&author2=" + this.get('author2').get('id');
      //console.log(url);

      var self = this;
      Ember.$.getJSON(url).then(function(_result) {
        self.set('result', _result.result);
      });
    }
  },

  hasTwoAuthors: Ember.computed("author1", "author2", {
    get: function() {
      var author1 = this.get('author1');
      var author2 = this.get('author2');

      if(!(author1 && author2)) {
        this.set('result', null);
      }
      return !!author1 && !!author2;
    }
  }),

  hasNotTwoAuthors: Ember.computed.not("hasTwoAuthors")
});
