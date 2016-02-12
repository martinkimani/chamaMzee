/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var db_conn = require('./utils/helpers');
var mysql = require('mysql');
var path = require('path');

var pool  = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'chamadb',
  connectionLimit : 10 
});
exports.index = function(req, res) {
  res.locals.ip = req.ip;
  res.sendFile(path.join(__dirname, '..', 'index.html'));
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
    console.log('here is req body '+req.body.status+' '+req.body.user_name);
    var d = new Date();
    var data = {
       user_id : req.body.user_id,
       user_name : req.body.user_name,
       status : req.body.status,
       password : req.body.password,
       last_login : 'never Logged'
            };
    console.log(data.create_time+'   '+data.last_login)
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

exports.getUser = function(req, res){
    
    var user_id = req.params.user_id;
    pool.getConnection(function(err,connection){
       var sql = 'select * from user where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
          
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
       connection.release();
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
    
    pool.getConnection(function(err,connection){
       var sql = 'update user set user_id="'+data.user_id+'",user_name="'+data.user_name+'",status="'+data.status+'" where user_id = ?';
       console.log(sql);
        connection.query(sql,[user_id],function(err,rows){
          
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

exports.loginUser = function(req, res){
    
    var user_id = req.body.user_id;
    var password = req.body.password;
    pool.getConnection(function(err,connection){
       var sql = 'select * from user where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
          
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
                    console.log(rows[0].user_id+' '+req.session.user.user_id);
               }
                    
                
           }
       });
       connection.release();
    });
};

exports.Usergroups = function(req,res){
    var user_id = req.session.user.user_id;
    
    pool.getConnection(function(err,connection){
       var sql = 'select group_id,group_name, user_access_level from group_user where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
          
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.json(rows);
           }
       });
       connection.release();
    });
};

exports.addGroup = function(req,res){
    var data = {
        group_name:req.body.group_name,
        password:req.body.password,
        location:req.body.location
    };
    
    pool.getConnection(function(err,connection){
       var sql = 'insert into groups group_name,password,location VALUES("'+data.group_name+'","'+data.password+'","'+data.location+'")';
       connection.query(sql,function(err,rows){
          
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.json({desc:"group registered successfully proceed to dashboard"});
           }
       });
       connection.release();
    });
}

exports.getGroup = function(req,res){
    var group_id = req.params.group_id;
    
    pool.getConnection(function(err,connection){
       var sql = 'select group_id,group_name,location from groups where group_id = ?';
       connection.query(sql,[group_id],function(err,rows){
          
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.json(rows);
           }
       });
       connection.release();
    });
    
};

exports.updateGroup = function(req,res){
    var data = {
        group_name:req.body.group_name,
        location:req.body.location
    }
    
    pool.getConnection(function(err,connection){
       var sql = 'update groups group_name,location VALUES("'+data.group_name+'","'+data.location+'")';
       connection.query(sql,function(err,rows){
          
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.json({desc:"group details successfuly updated"});
           }
       });
       connection.release();
    });
};

exports.deactivateUser = function (req,res){
    var user_id = req.body.user_id;
    pool.getConnection(function(err,connection){
       var sql = 'update user status VALUES("inactive") where user_id = ?';
       connection.query(sql,[user_id],function(err,rows){
          
           if(err){
               res.send('could not query db check your query');
               console.log('error is '+err);
           }else{
               res.json({desc:"User deactivated"});
           }
       });
       connection.release();
    });
};



