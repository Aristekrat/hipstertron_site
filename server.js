'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mysql = require('mysql');
/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');


/*
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '412909AB'
});

connection.connect(function(err) {
    if (err) {
        console.log(err)
    }
});

Probably worked? 
var post = {
    id: 1,
    title: 'Hello MySQL'
};
var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
    // Neat!
});
console.log(query.sql);
*/

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function() {
    console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
})
/*
db
	.sequelize
	.sync({force: true})
	.complete(function(err) {
		if (err) {
			throw err[0]
		} else {
			app.listen(config.port, config.ip, function () {
  				console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
			})
		}
	});
*/

// Expose app
exports = module.exports = app;