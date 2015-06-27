import Ember from 'ember';
import AutoCompleteBooks from 'bookstore-frontend/components/auto-complete-books';

export default AutoCompleteBooks.extend({
  actions: {
    search: function() {
      this.sendAction('search');
    }
  }
});
