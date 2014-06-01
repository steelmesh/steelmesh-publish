var test = require('tape');
var path = require('path');
var nano = require('nano')('http://localhost:5984');
var publish;

module.exports = function(dbname) {
  test('create the publish task', function(t) {
    t.plan(1);
    publish = require('../')(nano.use(dbname), {
      srcPath: path.resolve(__dirname, 'assets', 'sample-0.0.1')
    });

    t.equal(typeof publish, 'function', 'publish function created');
  });

  test('upload the initial version of the sample (0.0.1)', function(t) {
    t.plan(1);
    publish(function(err) {
      t.ifError(err, 'completed without error');
    });
  });

  test('validate document uploaded', function(t) {
    t.plan(4);
    nano.use(dbname).get('sampleapp', function(err, body) {
      t.ifError(err);
      t.equal(body._id, 'sampleapp');
      t.equal(body.name, 'sampleapp');
      t.equal(body.version, '0.0.1');
    });
  });
};
