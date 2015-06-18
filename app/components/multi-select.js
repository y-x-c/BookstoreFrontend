import Ember from 'ember';
import AutoComplete from 'bookstore-frontend/components/auto-complete';

export default Ember.Component.extend({
  actions: {
    removeValue: function(value) {
      var values = this.get('values');

      // cannot delete value on original array
      // that way will not trigger view refreshing
      // only new array will trigger
      var newValues = [].concat(values);
      var index = values.indexOf(value);
      newValues.splice(index, 1);
      this.set('values', newValues);
    }
  },

  keyDown: function(event) {
    var self = this;
    if (event.keyCode == 13) { //enter
      var value = this.get('value');

      if (!!value) {
        this.get('values').addObject(value);
        self.set('textValue', "");
      }

      event.preventDefault();
    }
  },


});
