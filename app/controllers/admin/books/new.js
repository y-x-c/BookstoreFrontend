import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function () {
      var book = this.store.createRecord('book', {
        id: this.get('ISBN'),
        title: this.get('title'),
        subtitle: this.get('subtitle'),
        publisher: this.get('publisher'),
        amount: this.get('amount'),
        price: this.get('price'),
        pubdate: new Date(this.get('pubdate')),
        format: this.get('format'),
        summary: this.get('summary')
      });
      book.get("authors").addObjects(this.get('authors'));
      book.save();

      //var self = this;
      //this.store.find("author", 1).then(function (author) {
      //  book.get("authors").addObject(author);
      //  self.store.find("author", 2).then(function (author) {
      //    book.get("authors").addObject(author);
      //    book.save();
      //  });
      //});
    }
  },

  authors: []

});
