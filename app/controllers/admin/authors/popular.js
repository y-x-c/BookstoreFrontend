import Ember from 'ember';

export default Ember.Controller.extend({
  updatePopularAuthors: function() {
    var self = this;
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var start = moment(this.get('start'));
    start = start.format("YYYY-MM-DD");
    var end = moment(this.get('end'));
    end = end.format("YYYY-MM-DD");
    var url = [host, namespace, "authors/popular"].join('/');
    url += "?start=" + start + "&end=" + end;

    Ember.$.getJSON(url).then(function(data) {
      var func = function(){
        var authors = self.store.pushMany('author', data.authors);
        authors.forEach(function(author) {
          author.set('sales', data.sales[author.get('id')]);
        });
        self.set('authors', authors);
      };

      // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
      Ember.run.once(self, func);
    });
  },

  rangeChanged: Ember.observer('start', 'end', function () {
    this.updatePopularAuthors();
  })
});
