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
        summary: this.get('summary'),
        img: this.get('img')
      });
      book.get("authors").addObjects(this.get('authors'));

      // todo give user feedback
      book.save(function(response) {

      },
      function(book) {
        book.destroyRecord();
      });

    }
  },

  authors: []

});
