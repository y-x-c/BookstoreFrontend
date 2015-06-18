import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function() {
      var author = this.store.createRecord('author', {
        name: this.get('name'),
        intro: this.get('intro')
      });

      author.save();
    }
  }
});
