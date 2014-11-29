'use strict';

exports.getPrefix = function() {
    var env = process.env.NODE_ENV;
    switch (env) {
        case "production":
            return "http://hipstertron-data.herokuapp.com"
            break;
        case "development":
            return "http://localhost:8000"
            break;
    }
}