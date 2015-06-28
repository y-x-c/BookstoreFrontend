import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    // QUESTION When did controller start observer
    controller.set('start', moment().subtract(7, 'days'));
  }
});
