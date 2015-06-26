import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    trust: function(trusted) {
      this.set('model.trusted', trusted);
      this.get('model').save();
    }
  },

  disabled: Ember.computed('model.trusted', {
    get: function() {
      //return this.get('model.trusted') != undefined;
      return false;
    }
  }),

  trusted: Ember.computed('model.trusted', {
    get: function() {
      var trusted = this.get('model.trusted');
      return trusted === true;
    }
  }),

  untrusted: Ember.computed('model.trusted', {
    get: function() {
      var trusted = this.get('model.trusted');
      return trusted === false;
    }
  }),
});
