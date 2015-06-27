import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function () {
      var notNullAttrs = ['ISBN', 'title', 'subtitle', 'publisher', 'amount', 'price', 'pubdate'];
      var ret = false;
      var self = this;

      notNullAttrs.forEach(function(attr) {
        if(!self.get(attr)) {
          self.set(attr + "Error", true);
          ret = true;
        }
      });

      if(self.get('authors.length') == 0) {
        self.set('authorsError', true);
        ret = true;
      }

      if(ret) return;

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
      book.save().then(
        function(response) {
          self.reset();
          self.set('hasAdded', true);
          self.set('hasError', false);

          notNullAttrs.forEach(function(attr) {
            self.set(attr + "Error", false);
          });

          self.set('authorsError', false);
        },
        function(book) {
          //self.store.deleteRecord(book);
          self.set('hasAdded', false);
          self.set('hasError', true);
        }
      );

    }
  },

  authors: [],

  reset: function() {
    var attrs = ['ISBN', 'title', 'subtitle', 'publisher', 'amount', 'price', 'pubdate', 'format', 'summary', 'img'];
    var self = this;
    attrs.forEach(function(attr) {
      self.set(attr, null);
    });

    this.set(authors, []);
  }

});
