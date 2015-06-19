import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:8080'
  //host: 'http://10.141.208.26:8080/~fudanu33'
});
