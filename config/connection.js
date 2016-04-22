/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mysql  = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100,
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'chamadb',
    debug : false
});

this.dbConnection = function (fn) {
    pool.getConnection(function (err, connection){
        if (err) {
            console.log('Database connection unavailable.');           
            fn();
        } else {
            fn(connection);
        }
    });
};