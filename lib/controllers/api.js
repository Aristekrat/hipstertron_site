'use strict';

var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD),
    http = require('http'),
    utility = require('./utility')


exports.sendEmail = function(req, res) {
    var email = new sendgrid.Email({
        to: 'aristekrat@gmail.com',
        from: 'brian@hipstertron.com',
        subject: 'Subject goes here',
        text: 'Hello world'
    });
    sendgrid.send(email, function(err, json) {
        if (err) {
            res.send(err)
            return console.error(err);
        } else {
            res.send(json)
        }
    });
};


/**
 * Express configuration
 */
/*exports.submitEmail = function(req, res) {
    var prefix = utility.getPrefix()
    var options = {

    }
}*/

/*
submitEmail: function(email, callback) {
                // Figure out a way to submit emails with protractor / jasmine. May require some python work. 
                $http({
                    method: 'POST',
                    url: environmentService.getPrefix() + "/sendEmail",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Test that the data is properly JSONIFIED
                    data: JSON.stringify(email)
                })
                    .then(function(response) {
                        return callback(response)
                    });
            }
 */

exports.getEnv = function(req, res) {
    res.send(process.env.NODE_ENV)
}