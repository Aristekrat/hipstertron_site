'use strict';

var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD),
    request = require("request"),
    http = require('http');

/**
 * sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD),
 * Express configuration
 */

function sendEmail(response) {
    console.log(response);
    var email = new sendgrid.Email({
        to: 'aristekrat@gmail.com',
        from: 'brian@hipstertron.com',
        subject: 'Oh Boy',
        text: 'You Bagged An Email'
    });
    sendgrid.send(email, function(err, json) {
        if (err) {
            console.error(err);
        } else {
            console.log(json)
        }
    });
}

exports.submitEmail = function(req, res) {

    var uri = utility.getPrefix() + "/sendEmail"
    var email = req.body
    var options = {
        uri: "http://localhost:8000/sendEmail",
        method: "POST",
        json: email
    }

    request.post(options, function(error, response, body) {
        if (error) {
            console.log("Error block")
            res.send(error)
        } else if (body === "Not Unique") {
            res.send(401, "Not Unique")
        } else {
            res.send(response)
            sendEmail(req.body.email)
        }
    })
}