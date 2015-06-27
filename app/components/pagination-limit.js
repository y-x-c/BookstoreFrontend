import Ember from 'ember';

export default Ember.Component.extend({
  options: [5, 10],

  actions: {
    select: function(option) {
      this.set('limit', option);
    }
  }
});
