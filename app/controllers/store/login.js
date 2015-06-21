import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  customer: Ember.computed.alias('controllers.application.customer'),
  actions: {
    login: function(username, password) {
      if(!username) this.set('errorUsr', true);
      if(!password) this.set('errorPwd', true);
      if(!username || !password) return;

      var self = this;
      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');
      var url = [host, namespace, "customers", "login"].join('/');
      var payload = {customer: {username: username, password: password}};

      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).done(function(data){
        var customer = self.store.push('customer', data['customer']);
        self.set('customer', customer);
        self.transitionToRoute('store.index');
      }).
        fail(function(errMsg) {
          self.set('errorUsr', true);
          self.set('errorPwd', true);
          $( "#loginPanel" ).effect("shake", {distance: 10});
        });
    }
  },

  usernameChanged: Ember.observer("username", function() {
    this.set('errorUsr', false);
  }),

  passwordChanged: Ember.observer("password", function() {
    this.set('errorPwd', false);
  }),

  invalid: Ember.computed('errorUsr', 'errorPwd', {
    get: function() {
      var errorUsr = this.get('errorUsr');
      var errorPwd = this.get('errorPwd');
      return !!errorUsr || !! errorPwd;
    }
  })
});
