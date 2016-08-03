/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var db_conn = require('../config/connection');
var mysql = require('mysql');
var path = require('path');

exports.index = function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
  //res.render('pages/login');
};

exports.users = function (req, res) {
    db_conn.dbConnection(function (conn) {
        var sql_query = 'select user_id,user_name,status from users';
        conn.query(sql_query, function (err, rows) {
            conn.release();
            if (err) {
                var error = 'could not connect to the db ' + err;
                console.log(error);
                res.send(error);
            } else {
                console.log('connection up');
                res.send(rows);
            }
        });

    });

};

exports.addUser = function(req, res){
    console.log('here is req body '+req.body.status+' '+req.body.user_name);
    var d = new Date();
    var data = {
       user_id : req.body.user_id,
       user_name : req.body.user_name,
       status : req.body.status,
       password : req.body.password,
       last_login : 'never Logged'
            };
    console.log(data.create_time+'   '+data.last_login);
    db_conn.dbConnection(function (connection) {
        var sql = 'insert into users set ?';
        connection.query(sql,data,function(err,rows){
          connection.release();
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.sendStatus(200);
           }
       });
    });

};

exports.getUser = function(req, res){
    
    var user_id = req.params.id;
    console.log(user_id);
    db_conn.dbConnection(function (connection) {
       var sql = 'select * from users where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
           connection.release();
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               if(rows.length < 1){
                   return res.json({"desc":"user not found"});
               }
               res.json(rows);    
           }
       });
        
    });
};

exports.updateUser = function(req, res){
    var user_id = req.params.user_id;
    console.log(user_id);
    console.log(req.body.user_id+'  '+req.body.user_name+' '+req.body.status);
   var data = {
       user_id : req.body.user_id,
       user_name : req.body.user_name,
       status : req.body.status
            };
    
    db_conn.dbConnection(function (connection) {
        var sql = 'update users set user_id="'+data.user_id+'",user_name="'+data.user_name+'",status="'+data.status+'" where user_id = ?';
        console.log(sql);
        connection.query(sql,[user_id],function(err,rows){
          connection.release();
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.sendStatus(200);
           }
       });
    });

};

exports.loginUser = function(req, res){
    
    var user_id = req.body.user_id;
    var password = req.body.password;
    console.log(req.body.user_id);
    //res.render('pages/user-group-list');
    db_conn.dbConnection(function (connection) {
        var sql = 'select * from users where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
          //connection.release();
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               if(rows.length < 1){
                   return res.json({"desc":"user not found"});
               }else if(rows[0].user_id === user_id && rows[0].password !== password){
                  return res.json({"desc":"Wrong username or password"});
               }else{
                   res.json(rows);
                    req.session.user = {
                        user_id:rows[0].user_id,
                        status:rows[0].status,
                        last_login:rows[0].last_login
                        
                    };
                    var date = new Date();
                    connection.query('update users set last_login=? where user_id=?',[date,user_id], function(err,rows){
                       connection.release(); 
                    });
                    
               }
                    
                
           }
       });
    });
};

exports.userDetail = function(req, res){
    if(req.session.user){
        console.log(req.session.user);
        res.json(req.session.user);
    }else{
        res.json({user:"not logged"});
    }
};

exports.deactivateUser = function (req,res){
    var user_id = req.body.user_id;
    
    db_conn.dbConnection(function (connection) {
       var sql = 'update users status VALUES("inactive") where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
          connection.release();
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.json({desc:"User deactivated"});
           }
       });
       
    });
};

