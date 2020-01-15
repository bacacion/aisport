const mysql = require('mysql');
const bluebird = require('bluebird');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    // macbook db port:
    // port: '8889',
    database: 'shop'
});
db.connect();

// promisifyAll must after db connect!!!
bluebird.promisifyAll(db);

module.exports= db;