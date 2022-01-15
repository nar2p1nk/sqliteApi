var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = 'db.sqlite'

var db = new sqlite3.Database(DBSOURCE)


module.exports = db

