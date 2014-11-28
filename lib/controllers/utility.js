'use strict';

exports.getPrefix = function() {
    var env = process.env.NODE_ENV;
    switch (env) {
        case "production":
            return {
                "host": "http://hipstertron-data.herokuapp.com",
                "port": "",
                "path": "/sendEmail"
            }
            break;
        case "development":
            return {
                "host": "http://localhost",
                "port": "8000",
                "path": "/sendEmail"
            }
            break;
    }
}