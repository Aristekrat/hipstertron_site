'use strict';

var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function () {
	console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
})

var email = new sendgrid.Email({
	to: 'aristekrat@gmail.com',
	from: 'brian@hipstertron.com',
	subject: 'Subject goes here',
	text: 'Hello world'
});
sendgrid.send(email, function (err, json) {
	if (err) {
		return console.error(err);
	}
	console.log(json);
});

// Expose app
exports = module.exports = app;