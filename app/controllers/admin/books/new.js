import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function () {
      var book = this.store.createRecord('book', {
        id: this.get('ISBN'),
        title: this.get('title'),
        subtitle: this.get('subtitle'),
        //publisher: this.store.find("publisher", 6),
        amount: this.get('amount'),
        price: this.get('price'),
        pubdate: new Date(this.get('pubdate')),
        format: this.get('format'),
        summary: this.get('summary')
      });

      this.store.find("publisher", 6).then(function (publisher) {
        book.set("publisher", publisher);
        book.save();
      });
    },

    selectSuggestion: function(suggestion) {
      this.set('publisher', suggestion.get('name'));
    },

    moveSuggestionDown: function() {
      var current = this.get('current');
      var last = current;
      var suggestions = this.get('suggestions');

      if(current === null) {
        current = 0;
        this.set('current', current);
      } else {
        current = (current + 1) % this.get('suggestionsLength');
        this.set('current', current);
      }

      suggestions && suggestions.then(function(suggestions) {
        if(suggestions.get('length')) {
          suggestions.objectAt(last).set('selected', false);
          suggestions.objectAt(current).set('selected', true);
        }
      });
    },

    moveSuggestionUp: function() {

    }
  },

  current: null,

  suggestions: function() {
    var self = this;
    var publisher = this.get('publisher');

    if (!publisher) {
      return null;
    }

    this.set('current', 0);
    var results = this.store.find('publisher', {name: this.get('publisher')});

    return results;
  }.property('publisher'),

  //tricky
  suggestionsLength: Ember.computed("suggestions", {
    set: function (key, value) {
      return value;
    },
    get: function() {
      var suggestions = this.get('suggestions');
      var self = this;

      suggestions && suggestions.then(function(suggestions) {
        self.set('suggestionsLength', suggestions.get('length'));
      });
    }
  }),

  hasSuggestion: function() {
    return this.get('suggestionsLength') > 0;
  }.property('suggestionsLength')
});
