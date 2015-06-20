import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    selectSuggestion: function(suggestion) {
      this.set('textValue', suggestion.get('title'));
      this.set('shouldDisplay', false);
      this.set('sendRequest', false);
      this.set('value', suggestion);
      this.set('suggestions', null);
    },

    moveSuggestionDown: function() {
      var current = this.get('current');

      current = (current + 1) % this.get('suggestionsLength');

      this.set('current', current);
    },

    moveSuggestionUp: function() {
      var current = this.get('current');

      current = (current - 1 + this.get('suggestionsLength')) % this.get('suggestionsLength');

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

    var oldTextValue = self.get('textValue');
    // set time out

    var func = function () {
      var currentTextValue = self.get('textValue');
      if(currentTextValue === oldTextValue && self.get('lastRequestValue') != oldTextValue) {
        self.set('sendRequest', true);
        self.set('lastRequestValue', oldTextValue);
        self.set('shouldDisplay', true);
        self.set('value', null);
      }
    };

    Ember.run.later(this, func, 200);
  },

  preventEnter: true,

  keyDown: function(event) {
    var self = this;
    if(this.get('hasSuggestion')) {
      this.set('shouldDisplay', true);

      if(event.keyCode == 38) { // up
        this.send('moveSuggestionUp');
      } else if (event.keyCode == 40) { //down
        this.send('moveSuggestionDown');
      } else if (event.keyCode == 13 || event.keyCode == 9) { //enter && tab
        this.get('suggestions').then(function(suggestions) {
          self.send('selectSuggestion', suggestions.objectAt(self.get('current')));
        });
        if(event.keyCode == 13 && this.get('preventEnter')) {
          event.preventDefault();
        }
      } else if (event.keyCode == 27) { //esc
        this.set('shouldDisplay', false);
      }
    }
  },

  current: 0,
  sendRequest: false,
  lastRequestValue: null,
  suggestionsCached: null,

  suggestions: Ember.computed("sendRequest", {
    get: function() {
      if (this.get('sendRequest')) {
        this.set('sendRequest', false);
        var value = this.get('textValue');

        if (!value) {
          return null;
        }

        this.set('current', 0);
        var term = this.get('term');
        var jsonstring = '{"' + term + '": "' + value + '","limit": 5' + '}';
        //console.log(jsonstring);
        var results = this.get('store').find(this.get('modelName'), JSON.parse(jsonstring));

        this.set('suggestionsCached', results);
        return results;
      } else {
        return this.get('suggestionsCached');
      }
    },
    set: function(key, value) {
      this.set('suggestionsCached', value);
      return value;
    }
  }),

  suggestionsLengthCached: null,
  suggestionsLength: Ember.computed("suggestions", {
    set: function (key, value) {
      this.set('suggestionsLengthCached', value);
      return value;
    },
    get: function() {
      var suggestions = this.get('suggestions');
      var self = this;

      !!suggestions && suggestions.then(function(suggestions) {
        self.set('suggestionsLength', suggestions.get('length'));
      });
      return this.get('suggestionsLengthCached');
    }
  }),

  hasSuggestion: function() {
    return this.get('suggestionsLength') > 0;
  }.property('suggestionsLength'),

  shouldDisplay: false,

  displaySuggestions: Ember.computed("shouldDisplay", "hasSuggestion", {
    get: function() {
      //console.log(this.get('shouldDisplay') + " " + this.get('suggestionsLength'));
      return this.get('shouldDisplay') && this.get('hasSuggestion');
    }
  })

});
