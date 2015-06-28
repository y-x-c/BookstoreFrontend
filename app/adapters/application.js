import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  ajax: function(url, method, hash) {
    hash = hash || {}; // hash may be undefined
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  },
  namespace: 'api',
  //host: 'http://localhost:8080'
  host: 'http://10.141.208.26:8080/~fudanu33'
});
