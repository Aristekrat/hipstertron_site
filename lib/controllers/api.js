'use strict';

var request = require("request"),
    http = require('http'),
    utility = require('./utility'),
    redis = require('redis'),
    config = require('../config/config.js'),
    client = redis.createClient(config.redisConnect);

// Determines the correct args to send to the function that actually does the response. 
exports.processResponse = function(req, res) {
    client.hgetall('resultSet', function(err, reply) {
        if (err || !reply) {
            console.log(err || "processResponse function received no response");
            sendAllConcerts(req, res);
        } else {
            //sendAllConcerts(req, res);
            switch (req.params.section) {
                case "beginning":
                    var begin = reply.beginning;
                    var end = reply.firstThird;
                    break;
                case "middle":
                    var begin = reply.firstThird;
                    var end = reply.secondThird;
                    break;
                case "end":
                    var begin = reply.secondThird;
                    var end = reply.end;
                    break;
            }
            sendConcertChunks(req, res, begin, end, reply.firstThird - 1);
        }
    })
}

// Designed to send an arbitrary chunk of concert data - TODO find way to reduce args and TEST
// Find out if this function is sending double items on the third transitions
function sendConcertChunks(req, res, begin, end, oneThird) {
    var results = [];
    var counter = oneThird;
    var begin = Number(begin); // It'd be good to find where the string conversion is happenning.
    var end = Number(end); // I think this code is good to leave in regardless though.
    for (var i = begin; i < end; i++) {
        client.hgetall(i, function(err, reply) {
            if (err || !reply) {
                counter = counter - 1;
                console.log(err || "Failed to get a concert: " + i);
            } else {
                results.push(reply);
                if (results.length === counter) {
                    res.send(200, results);
                    return 0;
                }
            }
        });
    }
}

// Designed to dump all concert data onto the user. TEST
function sendAllConcerts(req, res) {
    client.get('count', function(err, count) {
        if (err || !count) {
            res.send(500, "Redis connection is down")
        } else {
            count = count - 1;
            var results = []
            for (var i = 0; i < count; i++) {
                client.hgetall(i, function(err, reply) {
                    if (err || !reply) {
                        count = count - 1;
                    } else {
                        results.push(reply);
                        if (results.length === count) {
                            console.log("Sending response")
                            res.send(200, results);
                        }
                    }
                })
            }
        }
    })
}