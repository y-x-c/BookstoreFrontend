import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  customerId: Ember.computed.alias('controllers.application.customerId'),
  actions: {
    signup: function() {
      var self = this;
      var username = this.get('username'),
        password = this.get('password'),
        password2 = this.get('password2'),
        name = this.get('name'),
        email = this.get('email'),
        phone = this.get('phone');

      // check attr is not empty
      this.set('errorUsr', !username);
      this.set('errorPwd', !password);
      this.set('errorPwd2', !password2);
      this.set('errorName', !name);
      this.set('errorEmail', !email);
      this.set('errorPhone', !phone);
      if(!username || !password || !password2 || !name || !email || !phone) {
        self.errorEffect();
        return;
      }

      // check pwd === pwd2
      this.set('errPwd', password != password2);
      this.set('errPwd2', password != password2);
      if(password != password2) {
        self.errorEffect();
        return;
      }

      var host = this.store.adapterFor('application').get('host');
      var namespace = this.store.adapterFor('application').get('namespace');
      var url = [host, namespace, "customers", "signup"].join('/');
      var payload = {customer: {username: username,
        password: password, name: name, email: email, phone: phone}};

      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).done(function(data){
        var customer = self.store.push('customer', data['customer']);
        //self.set('customerId', data['customer']['id']);
        self.set('customer', customer);
        self.transitionToRoute('store.index');
      }).
        fail(function(errMsg) {
          self.errorEffect();
        });
    }
  },

  errorEffect: function() {
    $( "#signupPanel" ).effect("shake", {distance: 10});
  },

  usernameChanged: Ember.observer("username", function() {
    this.set('errorUsr', false);
  }),

  passwordChanged: Ember.observer("password", function() {
    this.set('errorPwd', false);
  }),

  emailChanged: Ember.observer("email", function() {
    this.set('errorEmail', false);
  }),

  phoneChanged: Ember.observer("phone", function() {
    this.set('errorPhone', false);
  }),

  nameChanged: Ember.observer("name", function() {
    this.set('errorName', false);
  }),

  password2Changed: Ember.observer("password2", function() {
    this.set('errorPwd2', false);
  }),

});
