import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application', 'store/cart'],
  totalPrice: Ember.computed.alias('controllers.store/cart.totalPrice'),
  customer: Ember.computed.alias('controllers.application.customer'),

  actions: {
    confirm: function() {
      var addr = this.get('addr');

      if(!addr) {
        this.set('addressError', true);
        return;
      }

      var newOrder = this.store.createRecord('order', {
        //id: moment(),
        address: addr,
        customer: this.get('customer'),
      });

      var self = this;
      newOrder.save().then(function() {
        var items = self.get('model');
        for(var i = 0; i < items.get('length'); i++) {
          var item = items.objectAt(i);

          item.set('amount', 0);
        }

        self.set('addressError', false);
        self.transitionToRoute('store.order');
      },
      function() {
        self.set('hasError', true);
        self.store.deleteRecord(newOrder);
      });
    }
  },


});
