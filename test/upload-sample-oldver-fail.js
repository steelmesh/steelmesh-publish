var test = require('tape');
var path = require('path');
var nano = require('nano')('http://localhost:5984');
var publish;

module.exports = function(dbname) {
  test('create the publish task', function(t) {
    t.plan(1);
    publish = require('../')(nano.use(dbname), {
      srcPath: path.resolve(__dirname, 'assets', 'sample-0.9.0')
    });

    t.equal(typeof publish, 'function', 'publish function created');
  });

  test('attempt to upload an older version fails (0.9.0)', function(t) {
    t.plan(1);
    publish(function(err) {
      t.ok(err instanceof Error, 'received error as expected');
    });
  });
};
