import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var book = this.get('book');
      var self = this;
      book.save().then(
        function() {
          self.set('hasUpdated', true);
          self.set('hasError', false);
        },
        function() {
          self.set('hasError', true);
          self.set('hasUpdated', false);
        }
      );
    },

    return: function() {
      this.set('book', null);
    }
  },

  title: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('title');
      }
      return null;
    }
  }),

  subtitle: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('subtitle');
      }
      return null;
    }
  }),

  publisher: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('publisher');
      }
      return null;
    }
  }),

  authors: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('authors');
      }
      return null;
    }
  }),

  amount: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('amount');
      }
      return null;
    }
  }),

  price: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('price');
      }
      return null;
    }
  }),

  pubdate: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('pubdate');
      }
      return null;
    }
  }),

  format: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('format');
      }
      return null;
    }
  }),

  keyword: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('keyword');
      }
      return null;
    }
  }),

  subject: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('subject');
      }
      return null;
    }
  }),

  summary: Ember.computed("book", {
    get: function() {
      var book = this.get('book');
      if (book) {
        return book.get('summary');
      }
      return null;
    }
  }),
});
