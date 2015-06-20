import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('start', moment().subtract(29, 'days'));
  }
});
