/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var db_conn = require('db_helper');
exports.index = function(req, res) {
  res.locals.ip = req.ip;
  res.render('home');
};

exports.users = function(req, res){
    db_conn.getConnection(function(err,connection){
        var sql_query = 'select user_id,user_name,status from users';
        connection.query(sql_query, function(err, rows){
           
            if(err){
                var error = 'could not connect to the error';
                console.log(error);
                res.send(error);
            }else{
                console.log('connection up');
            }
        });
    });
};

exports.addUsers = function(req, res){
    
};