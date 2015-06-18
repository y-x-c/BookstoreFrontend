import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'ISBN'
  //
  //serialize: function(record, options) {
  //  options = options || {includeId: true};
  //  return this._super(record, options);
  //}
});
