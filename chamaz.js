/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Load required packages
var express = require('express');
var path = require('path');
var secrets = require('./config/secrets');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemcachedStore = require('connect-memcached')(session);
var routes = require('./routes');

// Create our Express application
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// 
app.use(cookieParser());
app.use(session({
      secret  : 'CatOnKeyboard'
    , resave: true,
      saveUninitialized: true
    , key     : 'test'
    , proxy   : 'true'
    , store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211']
    })
}));





// Add static middleware
var oneDay = 86400000;
app.use('/assets',express.static(__dirname + '/assets', { maxAge: oneDay }));
app.use('/templates',express.static(__dirname + '/templates', { maxAge: oneDay }));

// Add jade view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// restrict 
function restrict(req, res, next) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  if (req.session.user) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    req.session.error = 'Access denied!';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    //res.sendFile(path.join(__dirname, 'index.html')); 
    res.sendFile(path.join(__dirname, 'index.html'));
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}


// Create our Express router
routes(app);



// Register all our routes
//app.use(router);

// Start the server
app.listen(9999);
console.log('the server is up and listening on port 9999');
