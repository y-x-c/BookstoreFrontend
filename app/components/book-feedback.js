import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    assess: function(rating) {
      var feedback = this.get('feedback');

      feedback.set('opinion', rating);
      feedback.save();
    },
  },

  veryUseful: Ember.computed('feedback', {
    get: function() {
      var opinion = this.get('feedback.opinion');
      return opinion === 2;
    }
  }),

  useful: Ember.computed('feedback', {
    get: function() {
      var opinion = this.get('feedback.opinion');
      return opinion === 1;
    }
  }),

  useless: Ember.computed('feedback', {
    get: function() {
      var opinion = this.get('feedback.opinion');
      return opinion === -1;
    }
  }),

  display: Ember.computed('customer', {
    get: function() {
      var cid = this.get('customer.id');

      return cid === null || (this.get('feedback.customer.id') != cid);
    }
  }),

  isNegative: Ember.computed('feedback.usefulness', {
    get: function() {
      return this.get('feedback.usefulness') < 0;
    }
  })
});
