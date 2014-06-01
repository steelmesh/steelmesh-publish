/* jshint node: true */
'use strict';

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
  return function(callback) {
  };
};
