/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Load required packages
var express = require('express');

// Create our Express application
var app = express();

// Add static middleware
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', {maxAge : oneDay}));

// Add jade view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Landing page route
router.get('/', function(req, res) {
  res.locals.ip = req.ip;
  res.render('home');
});

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);
