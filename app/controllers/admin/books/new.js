import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function () {
      var book = this.store.createRecord('book', {
        id: this.get('ISBN'),
        title: this.get('title'),
        subtitle: this.get('subtitle'),
        //publisher: this.store.find("publisher", 6),
        amount: this.get('amount'),
        price: this.get('price'),
        pubdate: new Date(this.get('pubdate')),
        format: this.get('format'),
        summary: this.get('summary')
      });

      this.store.find("publisher", 6).then(function (publisher) {
        book.set("publisher", publisher);
        book.save();
      });
    }
  }

});
