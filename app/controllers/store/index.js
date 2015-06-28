import Ember from 'ember';

export default Ember.Controller.extend({
  offset: 25,

  book: Ember.computed(function() {
    return this.store.find('book', "9787508649719");
  })
});
