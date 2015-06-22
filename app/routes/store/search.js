import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    if(params.all) {
      return this.store.find('book', params);
    } else {
      return null;
    }
  }
});
