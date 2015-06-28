import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    var start = moment().subtract(30, 'days').startOf('day');
    var end = moment().endOf('day');
    start = start.format("YYYY-MM-DD HH:mm:ss");
    end = end.format("YYYY-MM-DD HH:mm:ss");

    this.store.find('book', {start: start, end: end, limit: 12}).then(
      function(data) {
        var popular = data;
        var i = 0;
        var rows = [];
        var length = popular.get('length');
        for(; i < length; i += 4) {
          var cols = [];
          for(var j = i; j < Math.min(length, i + 4); j++) {
            cols.push(popular.objectAt(j));
          }
          rows.push(cols);
        }

        controller.set('popularRows', rows);
      }

    )
  }
});
