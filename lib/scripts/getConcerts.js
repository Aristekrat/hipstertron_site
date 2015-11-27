var request = require('request'),
    config = require('../config/config.js'),
    redis = require('redis'),
    client = redis.createClient(config.redisConnect);

function addConcertsIntoRedis(concerts) {
    try {
        var converted = JSON.parse(concerts);
        client.flushdb();
        for (var i = 0; i < converted.concertListings.length; i++) {
            if (converted.concertListings[i].price === 0) {
                converted.concertListings[i].price = "Unavailable";
            }
            client.hmset(i, converted.concertListings[i], function(err, replies) {
                if (err || !replies) {
                    console.log(err || "No reply"); // This function should probably count if there any errors. Handle it differently based on #s.
                }
            });
        }
    } catch (e) {
        // Data came through incorrectly. App should probably email me about it. 
    }
}

// Sets the total concert # in Redis
function setCount() {
    client.keys('*', function(err, replies) {
        if (err || !replies) {
            console.log("set count error:" + err || "set count function received no response");
        } else {
            client.set('count', replies.length, function(err, response) {
                if (err || !response) {
                    console.log("set count error:" + err || "setCount function received no response");
                } else {
                    console.log("set count function successful");
                }
            });
        }
    });
}

// Gets the total results in the redis database and divides the # of results into thirds, sets a hash in the DB.
function divideResults() {
    client.get('count', function(err, reply) {
        if (err || !reply) {
            console.log("divideResults error " + err || "divideResults function received no response");
        } else {
            var intReply = Number(reply);
            var t = Math.round(intReply / 3);
            var result = {
                "beginning": 0,
                "firstThird": t,
                "secondThird": t + t,
                "end": intReply
            };
            client.hmset('resultSet', result, function(err, reply) {
                if (err || !reply) {
                    console.log("divideResults error " + err || "divideResults function: setting the resultSet received no response");
                } else {
                    console.log("divideResults function succeesful");
                }
            });
        }
    });
}

// The execution function, it calls the setup functions above and queries the remote database
function getConcerts(req, res) {
    var options = {
        uri: config.apiPrefix + "/get-concerts"
    };
    request.get(options, function(error, response, body) {
        if (error || !response) {
            console.log(error || "getConcerts function received no response");
        } else if (response.statusCode !== 200) {
            console.log("Auth failed or other error");
        } else {
            addConcertsIntoRedis(body);
            setCount();
            setTimeout(function() {
                divideResults();
            }, 100);
            setTimeout(function() {
                process.exit();
            }, 2000);
        }
    });
}

getConcerts();