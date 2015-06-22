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
    },
    add2Cart: function() {
      var self = this;
      this.store.find('cart', this.get('customer.id')
        + '-' + this.get('model.id')).then(function(oldItem) {

        if(oldItem){
          oldItem.set('amount', oldItem.get('amount') + Number(self.get('amount')));
          oldItem.save();
        } else {
          var cartItem = self.store.createRecord('cart', {
            book: self.get('model'),
            amount: self.get('amount'),
            customer: self.get('customer')
          });
          cartItem.save();
        }
      });
    }
  },

  ownFeedback: Ember.computed('customer', {
    get: function() {
      var customer = this.get('customer');

      if(!customer) return null;

      var self = this;
      return this.store.filter('feedback', function(feedback) {
        //console.log(feedback.get('id'), feedback.get('book.id'), self.get('model.id'));
        var feedbackBook = feedback.get('book.id'),
          modelBook = self.get('model.id'),
          feedbackCustomer = feedback.get('customer.id'),
          customer = self.get('customer.id');
        return feedbackBook === modelBook && feedbackCustomer === customer;
      });
    }
  })
});
