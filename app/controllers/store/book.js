import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  customer: Ember.computed.alias('controllers.application.customer'),

  rating: 10,
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

      if(this.get('customer') == null) {
        this.transitionToRoute('store.login');
      }
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

        self.transitionToRoute('store.cart');
      });
    },

    updateFeedbacks: function() {
      var self = this;
      var feedbacks = this.store.find('feedback', {
        isbn: this.get('model.id'),
        limit: this.get('limit'),
        offset: this.get('offset'),
        orderBy: (this.get('orderBy') === 'Time' ? 1 : 0)
      }).then(function(feedbacks) {
        self.set('feedbacks', feedbacks); // cannot put outside "then"
      });
    },

    select: function(option) {
      this.set('orderBy', option);
    }
  },

  ownFeedback: Ember.computed('customer', {
    get: function() {
      var customer = this.get('customer');

      if(!customer) return null;

      var self = this;
      var modelBook = self.get('model.id'), customer = self.get('customer.id');
      return this.store.filter('feedback', function(feedback) {
        //console.log(feedback.get('id'), feedback.get('book.id'), self.get('model.id'));
        var feedbackBook = feedback.get('book.id'),
          feedbackCustomer = feedback.get('customer.id');

        return feedbackBook === modelBook && feedbackCustomer === customer;
      });
    }
  }),

  limit: 5,
  offset: 0,
  total: 0,
  options: ['Usefulness', 'Time'],
  orderBy: 'Usefulness',

  updateFeedbacks: Ember.observer('customer', 'model.id', function(){
    this.send('updateFeedbacks');
  }),

  feedbacksChanged: Ember.observer('feedbacks', function() {
    this.set('total', this.get('feedbacks.meta.total') || 0);
  }),

  pagecount: Ember.computed("limit", "total", {
    get: function() {
      return Math.ceil(this.get('total') / this.get('limit'));
    }
  }),

  limitChanged: Ember.observer('limit', function() {
    this.send('updateFeedbacks');
  }),

  orderByChanged: Ember.observer('orderBy', function() {
    this.send('updateFeedbacks');
  })

});
