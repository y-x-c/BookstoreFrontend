import Ember from 'ember';

export default Ember.Controller.extend({
  offset: 25,

  book: Ember.computed(function() {
    return this.store.find('book', "9787508649719");
  }),

  data : {
    labels: [],
    datasets: [
      {
        label: "Orders",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: []
      }
    ]
  },

  options: {
    responsive : true
  },

  type: 'line',
  display: true,

  updateChart: function() {
    var self = this;
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var start = moment().subtract(7, 'days').startOf('day');
    var _start = start.format("YYYY-MM-DD HH:mm:ss");
    var end = moment().endOf('day');
    var _end = end.format("YYYY-MM-DD HH:mm:ss");
    var url = [host, namespace, "customers/visits"].join('/');
    url += "?start=" + _start + "&end=" + _end;

    Ember.$.getJSON(url).then(function(visits) {
      var func = function(){
        var labels = [];
        var data = [];
        for(var current = start; current <= end; current = current.add(1, 'days')) {
          labels.push(current.format("MM-DD"));
          var value = visits['visits'][current.format("YYYY-MM-DD")] || 0;
          data.push(value);
        }

        var chartData = {
          labels: labels,
          datasets: [
            {
              label: "Visits",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: data
            }
          ]
        };

        self.set('data', chartData);
        var display = self.get('display')
        self.set('display', !display);
      };

      // func()  //WHY this method lead the view flash many times ANSWER since not using sideload?
      Ember.run.once(self, func);
    });
  },
});
