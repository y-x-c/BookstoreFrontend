import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "",

  fixedNum: Ember.computed('num', 'fixed', {
    get: function() {
      if(this.get('num')) {
        return this.get('num').toFixed(this.get('fixed'));
      } else {
        var num = 0;
        return num.toFixed(this.get('fixed'));
      }
    }
  })
});
