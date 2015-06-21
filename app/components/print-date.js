import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  fomatedDate: Ember.computed('date', {
    get: function() {
      return moment(this.get('date')).format("YYYY");
    }
  })

});
