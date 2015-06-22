import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  fomatedDate: Ember.computed('date', {
    get: function() {
      if(this.get('format') == null)
        return moment(this.get('date')).format("YYYY");
      else
        return moment(this.get('date')).format(this.get('format'));
    }
  })

});
