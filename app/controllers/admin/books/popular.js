import Ember from 'ember';

export default Ember.Controller.extend({
  rangeChanged: Ember.observer('start', 'end', function () {
    var self = this;
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var start = moment(this.get('start'));
    start = start.format("YYYY-MM-DD");
    var end = moment(this.get('end'));
    end = end.format("YYYY-MM-DD");
    var url = [host, namespace, "books/popular"].join('/');
    url += "?start=" + start + "&end=" + end;

    var payload = Ember.$.getJSON(url).then(function(data) {
      var func = function(){
        data.books.forEach(function(book) {
          book = self.store.normalize('book', book);
        });

        var books = self.store.pushMany('book', data.books);
        books.forEach(function(book) {
          book.set('sales', data.sales[book.get('id')]);
        });
        self.set('books', books);
      };

      // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
      Ember.run.once(self, func);
    });
  })
});
