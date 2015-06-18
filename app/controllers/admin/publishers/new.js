import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var publisher = this.store.createRecord('publisher', {
        name: this.get('name'),
        intro: this.get('intro')
      });

      publisher.save();
    }
  }
});
