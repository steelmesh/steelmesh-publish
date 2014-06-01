/* jshint node: true */
'use strict';

var attachmate = require('attachmate');
var debug = require('debug')('steelmesh-publish');
var path = require('path');
var semver = require('semver');

/**
  # steelmesh-publish

  This module is responsible for uploading a local folder to a steelmesh CouchDB
  instance under the following conditions:

  - the selected CouchDB database is writable
  - the app version is a greater semver than what has been published to the db
    already

  ## Example Usage

  <<< examples/publish.js
**/

module.exports = function(db, opts) {
  var basePath = db.config.url + '/' + db.config.db;
  var srcPath = (opts || {}).srcPath || process.cwd();

  function checkPublishOK(pkg, callback) {
    db.get(pkg.name, function(err, body) {
      // if we received an error and it was a missing error then proceed
      if (err && err.message === 'missing') {
        return callback();
      }
      else if (err) {
        return callback(err);
      }

      // do a comparison on the uploaded version vs the local version
      if (! semver.gt(pkg.version, body.version)) {
        return callback(new Error('Need a new version to update app'));
      }

      return callback();
    });
  }

  return function(callback) {
    var pkg;
    var reader;

    try {
      debug('reading package.json from ' + srcPath);
      pkg = require(path.join(srcPath, 'package.json'));
    }
    catch (e) {
      return callback(e);
    }

    // ensure we have a package name and version
    if (! pkg.name) {
      return callback(new Error('no name defined in package.json - cannot publish'));
    }

    if (! semver.valid(pkg.version)) {
      return callback(new Error('invalid or missing version in package.json - cannot publish'));
    }

    checkPublishOK(pkg, function(err) {
      if (err) {
        return callback(err);
      }

      // update the doc with the package.json details and then upload
      db.insert(pkg, pkg.name, function(err) {
        if (err) {
          return callback(err);
        }

        attachmate.upload(basePath + '/' + pkg.name, srcPath, callback);
      });
    });
  };
};
