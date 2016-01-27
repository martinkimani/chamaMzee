/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var db_conn = require('./utils/helpers');
var mysql = require('mysql');

var pool  = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'mydb',
  connectionLimit : 10 
});
exports.index = function(req, res) {
  res.locals.ip = req.ip;
  res.render('home');
};

exports.users = function(req, res){
    pool.getConnection(function(err,connection){
        var sql_query = 'select user_id,user_name,status from user';
        connection.query(sql_query, function(err, rows){
           
            if(err){
                var error = 'could not connect to the db '+err;
                console.log(error);
                res.send(error);
            }else{
                console.log('connection up');
                res.send(rows);
            }
        });
        
        connection.release();
    });
};

exports.addUser = function(req, res){
    console.log('here is req body '+req.body.status);
   var data = {
       user_id : req.body.user_id,
       user_name : req.body.user_name,
       status : req.body.status
            };
    
    pool.getConnection(function(err,connection){
       var sql = 'insert into user set ?';
       connection.query(sql,data,function(err,rows){
          
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.sendStatus(200);
           }
       });
       connection.release();
    });
};