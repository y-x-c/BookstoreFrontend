import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectSuggestion: function() {
      this.sendAction('action', this.get('suggestion'));
    }
  },

  selected: function() {
    console.log('current ' + this.get('current') + ' index ' + this.get('index'));
    if(this.get('current') === this.get('index')) return true;
    return false;
  }.property('current', 'index'),


});
