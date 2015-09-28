'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    ip: '0.0.0.0',
    port: process.env.PORT || 9000,
    env: process.env.NODE_ENV,
    redisConnect: process.env.NODE_ENV === "production" ? process.env.REDISCLOUD_URL : "http://127.0.0.1:6379",
    apiPrefix: process.env.NODE_ENV === "production" ? "http://hipstertron-data.herokuapp.com" : "http://localhost:8000"
};