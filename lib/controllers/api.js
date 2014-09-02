'use strict';
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

exports.sendEmail = function(req, res) {
    sendgrid.send({
            to: 'aristekrat@gmail.com',
            from: 'brian@hipstertron.com',
            subject: 'Hay There!',
            text: 'Sup bro.'
        },
        function(err, json) {
            if (err) {
                res.send(err)
            } else {
                res.send(json)
            }
        });
}