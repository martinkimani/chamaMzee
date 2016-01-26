var mysql = require('mysql');

var pool = module.exports  = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  connectionLimit : 10 
});
