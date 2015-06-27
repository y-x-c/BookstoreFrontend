import Ember from 'ember';

export default Ember.Component.extend({
  className: "nav",
  min: 1,

  actions: {
    goto: function(page) {
      if(page == this.get('current')) return;
      this.set('offset', this.get('limit') * (page - 1));
      this.sendAction('search');
    },

    prev: function() {
      var page = this.get('current') - 1;
      if(page < this.get('min')) return ;
      this.set('offset', this.get('limit') * (page - 1));
      this.sendAction('search');
    },

    next: function() {
      var page = this.get('current') + 1;
      if(page > this.get('max')) return;
      this.set('offset', this.get('limit') * (page - 1));
      this.set('offset', this.get('offset') + this.get('limit'));
      this.sendAction('search');
    }
  },

  disabledPrev: Ember.computed('min', 'current', {
    get: function() {
      return this.get('current') === this.get('min');
    }
  }),

  disabledNext: Ember.computed('max', 'current', {
    get: function() {
      return this.get('current') === this.get('max');
    }
  }),

  current: Ember.computed('offset', 'limit', {
    get: function() {
      return Math.floor(this.get('offset') / this.get('limit')) + 1;
    }
  }),

  pages: Ember.computed('current', 'max', 'min', {
    get: function() {
      var pages = [];
      var self = this;
      var max = this.get('max');
      var min = this.get('min');
      var current = this.get('current');
      var margin = 2;
      var extent = margin * 2 + 1;

      if(max - min <= 11) {
        for(var i = min; i <= max; i++) {
          pages.push({
            disabled: false,
            active: current === i,
            value: i,
          });
        }
      } else {
        if(current > extent) {
          for(var i = min; i <= min + 1; i++) {
            pages.push({
              disabled: false,
              active: current === i,
              value: i,
            });
          }

          pages.push({
            disabled: true,
            active: false,
            value: "...",
          });
        } else {
          for(var i = min; i <= Math.max(min + 3, current + 1); i++) {
            pages.push({
              disabled: false,
              active: current === i,
              value: i,
            });
          }
        }

        if(current > extent && current <= max - extent) {
          for(var i = current - margin; i <= current + margin; i++) {
            pages.push({
              disabled: false,
              active: current === i,
              value: i,
            });
          }
        }

        if(current > max - extent) {
          for(var i = Math.min(max - 3, current - 1); i <= max; i++) {
            pages.push({
              disabled: false,
              active: current === i,
              value: i,
            });
          }
        } else {
          pages.push({
            disabled: true,
            active: false,
            value: "...",
          });

          for(var i = max - 1; i <= max; i++) {
            pages.push({
              disabled: false,
              active: current === i,
              value: i,
            });
          }
        }
      }

      return pages;
    }

  }),
});
