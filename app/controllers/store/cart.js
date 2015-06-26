import Ember from 'ember';

export default Ember.Controller.extend({
  totalPrice: Ember.computed('model', {
    get: function() {
      var items = this.get('model');

      var totalPrice = 0.00;
      for(var i = 0; i < items.get('length'); i++) {
        var item = items.objectAt(i);
        totalPrice = totalPrice + item.get('amount') * item.get('book.price');
      }

      return totalPrice;
    }
  })
});
