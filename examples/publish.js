var path = require('path');
var db = require('nano')('http://localhost:5984/');

// create the application synchronizer
var publish = require('../')(db.use('steelmesh'), {
  srcPath: path.resolve(__dirname, 'sample')
});

// perform the sync operation
publish(function(err) {
  if (err) {
    return console.error('Unable to publish app: ', err);
  }

  console.log('application publish complete');
});
