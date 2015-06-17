import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin');

  this.route('admin', function() {
    this.route('books', function() {
      this.route('new');
    });
  });

  this.route('store', { path: '/' } , function() {
    this.route('book', { path: '/books/:ISBN' });
  });
});

export default Router;
