import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectSuggestion: function() {
      this.sendAction('action', this.get('suggestion'));
    }
  },

  selected: function() {
    if(this.get('current') === this.get('index')) return true;
    return false;
  }.property('current', 'index'),


});
