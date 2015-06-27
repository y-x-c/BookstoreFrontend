import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    submit: function() {
      if(!this.get('name')) {
        this.set('nameError', true);
        return;
      }

      var publisher = this.store.createRecord('publisher', {
        name: this.get('name'),
        intro: this.get('intro')
      });

      var self = this;

      publisher.save().then(
        function() {
          self.set('name', null);
          self.set('intro', null);
          self.set('hasAdded', true);
          self.set('hasError', false);
          self.set('nameError', false);
        },
        function() {
          self.set('hasAdded', false);
          self.set('hasError', true);
        }
      );
    }
  }
});
