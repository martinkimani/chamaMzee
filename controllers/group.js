// load dependencies
var db_conn = require('../config/connection');
var path = require('path');

exports.userGroups = function(req,res){
    res.render('pages/user-group-list');
//    var user_id = req.session.user.user_id;
//    
//    db_conn.dbConnection(function (connection) {
//       var sql = 'select group_id,group_name, user_access_level from group_user where user_id = ?';
//       connection.query(sql,[user_id],function(err,rows){
//          connection.release();
//           if(err){
//               res.send('could not query db check your query');
//               console.log('error is '+err);
//           }else{
//               res.json(rows);
//           }
//       });
//        
//    });
};

exports.addGroup = function(req,res){
    var data = {
        group_name:req.body.group_name,
        password:req.body.password,
        location:req.body.location
    };
    
    db_conn.dbConnection(function (connection) {
        var sql = 'insert into groups group_name,password,location VALUES("' + data.group_name + '","' + data.password + '","' + data.location + '")';
        connection.query(sql, function (err, rows) {
            connection.release();
            if (err) {
                res.send('could not query db check your query');
                console.log('error is ' + err);
            } else {
                res.json({desc: "group registered successfully proceed to dashboard"});
            }
        });

    });
}

exports.getGroup = function(req,res){
    var group_id = req.params.group_id;
    
    db_conn.dbConnection(function (connection) {
        var sql = 'select group_id,group_name,location from groups where group_id = ?';
        connection.query(sql, [group_id], function (err, rows) {
            connection.release();
            if (err) {
                res.send('could not query db check your query');
                console.log('error is ' + err);
            } else {
                res.json(rows);
            }
        });

    });
    
};

exports.updateGroup = function(req,res){
    var data = {
        group_name:req.body.group_name,
        location:req.body.location
    }
    
    db_conn.dbConnection(function (connection) {
        var sql = 'update groups group_name,location VALUES("' + data.group_name + '","' + data.location + '")';
        connection.query(sql, function (err, rows) {
            connection.release();
            if (err) {
                res.send('could not query db check your query');
                console.log('error is ' + err);
            } else {
                res.json({desc: "group details successfuly updated"});
            }
        });

    });
    
};

