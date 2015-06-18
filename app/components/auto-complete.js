import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectSuggestion: function(suggestion) {
      this.set('_value', suggestion.get(this.get('term')));
      this.set('shouldDisplay', false);
      this.set('sendRequest', true);
    },

    moveSuggestionDown: function() {
      var current = this.get('current');

      current = (current + 1) % this.get('suggestionsLength');

      this.set('current', current);
    },

    moveSuggestionUp: function() {
      var current = this.get('current');

      current = (current + 1) % this.get('suggestionsLength');

      this.set('current', current);
    }
  },

  focusIn: function() {
    this.set('shouldDisplay', true);
  },

  focusOut: function(){
    this.set('shouldDisplay', false);
  },

  keyUp: function(event) {
    //prevent send request during typing
    var self = this;

    var __value = self.get('_value');
    // set time out
    var func = function () {
      if(self.get('_value') === __value && self.get('lastValue') != __value) {
        this.set('sendRequest', true);
        this.set('lastValue', __value);
      }
    };

    Ember.run.later(this, func, 200);
  },

  keyDown: function(event) {
    var self = this;
    if(this.get('hasSuggestion')) {
      this.set('shouldDisplay', true);
      
      if(event.keyCode == 38) { // up
        this.send('moveSuggestionUp');
        event.preventDefault();
      } else if (event.keyCode == 40) { //down
        this.send('moveSuggestionDown');
        event.preventDefault();
      } else if (event.keyCode == 13 || event.keyCode == 9) { //enter && tab
        this.get('suggestions').then(function(suggestions) {
          self.send('selectSuggestion', suggestions.objectAt(self.get('current')));
        });
        event.preventDefault();
      } else if (event.keyCode == 27) { //esc
        this.set('shouldDisplay', false);
      }
    }
  },

  current: 0,
  sendRequest: false,
  lastValue: null,
  suggestionsCached: null,

  suggestions: function() {
    if(this.get('sendRequest')) {
      this.set('sendRequest', false);
      var value = this.get('_value');
      console.log(value);

      if (!value) {
        return null;
      }

      this.set('current', 0);
      var term = this.get('term');
      var jsonstring = '{"' + term + '": "' + value + '"}';
      var results = this.get('store').find(this.get('modelName'), JSON.parse(jsonstring));

      this.set('suggestionsCached', results);
      return results;
    } else {
      return this.get('suggestionsCached');
    }
  }.property('sendRequest'),

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
  }.property('suggestionsLength'),

  shouldDisplay: false,

  displaySuggestions: Ember.computed("shouldDisplay", "hasSuggestion", {
    get: function() {
      return this.get('shouldDisplay') && this.get('hasSuggestion');
    }
  })

});
