import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),
  customer: Ember.computed.alias('controllers.application.customer'),
  actions: {
    logout: function() {
      var self = this;
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');
      var url = [host, namespace, "customers", "logout"].join('/');

      Ember.$.ajax({
        type: "POST",
        url: url,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        xhrFields: {withCredentials: true}
      });

      this.set('customer', null);
      this.store.init();
    },
    search: function() {
      this.transitionToRoute('store.search', {queryParams:{all: this.get('keywords')}});
    }
  },

  displaySearchbar: Ember.computed('currentPath', {
    get: function() {
      var routes = ['store.search', 'store.advancedSearch', 'store.login', 'store.signup'];

      return routes.indexOf(this.get('currentPath')) < 0;
    }
  })
});
