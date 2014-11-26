'use strict';

var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

exports.sendEmail = function (req, res) {
	var email = new sendgrid.Email({
		to: 'aristekrat@gmail.com',
		from: 'brian@hipstertron.com',
		subject: 'Subject goes here',
		text: 'Hello world'
	});
	sendgrid.send(email, function (err, json) {
		if (err) {
			res.send(err)
			return console.error(err);
		} else {
			res.send(json)
		}
	});
}

exports.getEnv = function (req, res) {
	res.send(process.env.NODE_ENV)
}