import Ember from 'ember';

export default Ember.Component.extend({
  mul: Ember.computed('a', 'b', {
    get: function() {
      return this.get('a') * this.get('b');
    }
  })
});
