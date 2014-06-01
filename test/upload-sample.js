var test = require('tape');
var path = require('path');
var nano = require('nano')('http://localhost:5984');
var publish;

module.exports = function(dbname) {
  test('create the publish task', function(t) {
    t.plan(1);
    publish = require('../')(nano.use(dbname), {
      srcPath: path.resolve(__dirname, 'assets', 'sample-0.0.1'),
      ignore: ['ignore.txt']
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

  test('validate attachment uploaded', function(t) {
    t.plan(3);
    nano.use(dbname).attachment.get('sampleapp', 'package.json', function(err, body) {
      var pkg;

      t.ifError(err);

      try {
        pkg = JSON.parse(body.toString());
      }
      catch (e) {
        t.fail('could not parse package.json');
        t.end();
      }

      t.equal(pkg.name, 'sampleapp');
      t.equal(pkg.version, '0.0.1');
    });
  });

  test('validate that ignored files are not uploaded', function(t) {
    t.plan(1);
    nano.use(dbname).attachment.get('sampleapp', 'ignore.txt', function(err, body) {
      t.ok(err instanceof Error, 'not found');
    });
  });
};
