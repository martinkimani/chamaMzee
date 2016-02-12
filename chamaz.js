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
    , key     : 'test'
    , proxy   : 'true'
    , store   : new MemcachedStore({
        hosts: ['127.0.0.1:11211']
    })
}));

// Load controllers
var homeController = require('./controllers/home');

// Add static middleware
var oneDay = 86400000;
app.use('/assets',express.static(__dirname + '/assets', { maxAge: oneDay }));
app.use('/templates',express.static(__dirname + '/templates', { maxAge: oneDay }));

// Add jade view engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Landing page route
router.get('/', homeController.index);
router.post('/api/user', homeController.addUser);
router.get('/api/users', homeController.users);
router.get('/api/user/:user_id', homeController.getUser);
router.put('/api/user/:user_id', homeController.updateUser);
router.post('/api/login', homeController.loginUser);

// Register all our routes
app.use(router);

// Start the server
app.listen(9999);
console.log('the server is up and listening on port 9999');
