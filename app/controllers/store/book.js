import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  customer: Ember.computed.alias('controllers.application.customer'),
  actions: {
    submitFeedback: function() {
      var customer = this.get('customer');
      var self = this;

      if (!customer) {
        this.transitionToRoute('store.login');
      } else {
        var book = this.get('model');
        var feedback = this.store.createRecord('feedback', {
          score: this.get('rating'),
          comment: this.get('comment'),
          book: book,
          customer: customer
        });
        feedback.save();
      }
    }
  },

  ownFeedback: Ember.computed('customer', {
    get: function() {
      var customer = this.get('customer');
      if(!customer) return null;

      var self = this;
      return this.store.filter('feedback', function(feedback) {
        return feedback.get('book.id') == self.get('model.id') &&
          feedback.get('customer.id') == customer.id;
      });
    }
  })
});
