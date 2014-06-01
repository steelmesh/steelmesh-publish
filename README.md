# steelmesh-publish

This module is responsible for uploading a local folder to a steelmesh CouchDB
instance under the following conditions:

- the selected CouchDB database is writable
- the app version is a greater semver than what has been published to the db
  already


[![NPM](https://nodei.co/npm/steelmesh-publish.png)](https://nodei.co/npm/steelmesh-publish/)

[![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/badges/stability-badges) 

## Example Usage

```js
var path = require('path');
var db = require('nano')('http://localhost:5984/');

// create the application synchronizer
var publish = require('steelmesh-publish')(db.use('steelmesh'), {
  srcPath: path.resolve(__dirname, 'sample')
});

// perform the sync operation
publish(function(err) {
  if (err) {
    return console.error('Unable to publish app: ', err);
  }

  console.log('application publish complete');
});

```

## License(s)

### Apache 2.0

Copyright 2014 Damon Oehlman <damon.oehlman@gmail.com>

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
