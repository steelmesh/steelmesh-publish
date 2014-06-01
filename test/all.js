var uuid = require('uuid');
var dbname = 'testdb-' + uuid.v4();

require('./createdb')(dbname);
require('./upload-sample')(dbname);
