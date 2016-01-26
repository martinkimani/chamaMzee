/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Load required packages
var express = require('express');
var path = require('path');
var secrets = require('./config/secrets');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


// Connect to the chamaz MongoDB
mongoose.connect(secrets.db);

// Create our Express application
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// Load controllers
var homeController = require('./controllers/home');

// Add static middleware
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

// Add jade view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Landing page route
router.get('/', homeController.index);
router.post('/api/user', homeController.addUser);
router.get('/api/users', homeController.users);
//router.get('/api/user/:user_id', homeController.getUser);
//router.put('/api/user/:user_id', homeController.updateUser);


//router.get('/user/:user');

// Register all our routes
app.use(router);

// Start the server
app.listen(9999);
console.log('the server is up and listening on port 9999');
