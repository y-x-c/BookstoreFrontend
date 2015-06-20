import Ember from 'ember';

export default Ember.Controller.extend({
  updatePopularPublishers: function() {
    var self = this;
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var start = moment(this.get('start'));
    start = start.format("YYYY-MM-DD");
    var end = moment(this.get('end'));
    end = end.format("YYYY-MM-DD");
    var url = [host, namespace, "publishers/popular"].join('/');
    url += "?start=" + start + "&end=" + end;

    Ember.$.getJSON(url).then(function(data) {
      var func = function(){
        var publishers = self.store.pushMany('publisher', data.publishers);
        publishers.forEach(function(publisher) {
          publisher.set('sales', data.sales[publisher.get('id')]);
        });
        self.set('publishers', publishers);
      };

      // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
      Ember.run.once(self, func);
    });
  },

  rangeChanged: Ember.observer('start', 'end', function () {
    this.updatePopularPublishers();
  })
});
