'use strict';

/*
var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);
var email      = new sendgrid.Email();

email.addTo(to);
email.setFrom(to);
email.setSubject('[sendgrid-php-example] Owl');
email.setText('Owl are you doing?');
email.setHtml('<strong>%how% are you doing?</strong>');
email.addSubstitution("%how%", "Owl");
email.addHeader('X-Sent-Using', 'SendGrid-API');
email.addHeader('X-Transport', 'web');
email.addFile({path: './gif.gif', filename: 'owl.gif'});

sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
*/

var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);



exports.sendEmail = function (req, res) {
	var email = new sendgrid.Email()
	email.addTo('aristekrat@gmail.com')
	email.setFrom('brian@hipstertron.com')
	email.setSubject('Hay there!')
	email.setText('Sup bro.')

	sendgrid.send(email, function (err, json) {
			if (err) {
				return console.error(err);
			}
			console.log(json);
		})
		/*    sendgrid.send({
		            to: 'aristekrat@gmail.com',
		            from: 'brian@hipstertron.com',
		            subject: 'Hay There!',
		            text: 'Sup bro.'
		        },
		        function(err, json) {
		            if (err) {
		                res.send(err)
		            } else {
		                res.send("Success")
		            }
		        });*/
}

exports.getEnv = function (req, res) {
	res.send(process.env.NODE_ENV)
}