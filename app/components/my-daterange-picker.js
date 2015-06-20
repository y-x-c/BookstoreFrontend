import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',

  _renderDatePicker: function() {
    var self = this;
    this.$('div span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

    this.$('div').daterangepicker({
      format: 'MM/DD/YYYY',
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      minDate: '01/01/2000',
      maxDate: '12/31/2100',
      dateLimit: { days: 60 },
      showDropdowns: true,
      showWeekNumbers: true,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: true,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      opens: 'right',
      drops: 'down',
      buttonClasses: ['btn', 'btn-sm'],
      applyClass: 'btn-primary',
      cancelClass: 'btn-default',
      separator: ' to ',
      locale: {
        applyLabel: 'Submit',
        cancelLabel: 'Cancel',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom',
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        firstDay: 1
      }
    }, function(start, end, label) {
      Ember.$('div span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      self.set('startDate', start);
      self.set('endDate', end);
    });
  },

  didInsertElement: function() {
    this._super.apply(this, arguments);
    Ember.run.schedule('afterRender', this, this._renderDatePicker);
  },

  //one-way binding currently
  //startDateDidChange: Ember.observer('startDate',function() {
  //  Ember.run.once(this, this._setStart);
  //}),
  //
  //endDateDidChange: Ember.observer('endDate',function() {
  //  Ember.run.once(this, this._setEnd);
  //}),
  //
  //dateOptionsChanged: Ember.observer('jQueryOptions',function() {
  //  Ember.run.once(this, this._setOptions);
  //}),

  willDestroyElement: function() {
    this._super.apply(this, arguments);
    if (this.state === 'inDOM' && this.$('div').data('daterangepicker')) {
      this.$('div').daterangepicker('remove');
    }
  }
});
