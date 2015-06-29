/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import(app.bowerDirectory +'/jquery-ui/jquery-ui.min.js');

app.import(app.bowerDirectory +'/moment/min/moment.min.js');

app.import(app.bowerDirectory +'/bootstrap-daterangepicker/daterangepicker.js');
app.import(app.bowerDirectory +'/bootstrap-daterangepicker/daterangepicker-bs3.css');

app.import(app.bowerDirectory +'/bootstrap/dist/css/bootstrap.min.css');
app.import(app.bowerDirectory +'/bootstrap/dist/js/bootstrap.min.js');

app.import(app.bowerDirectory +'/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
  destDir: 'fonts'
});

app.import(app.bowerDirectory +'/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
  destDir: 'fonts'
});

module.exports = app.toTree();

