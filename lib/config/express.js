'use strict';

var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
    var env = app.get('env');

    if ('development' === env) {
        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/js/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'app')));
        app.set('views', config.root + '/app/dist');
    }

    if ('production' === env) {
        app.use(compression());
        /* app.use(express.favicon('../../app/img', 'favicon.ico', {
            maxAge: 25920000000
        }));*/
        app.use(express.static(path.join(config.root, 'app')));
        app.set('views', config.root + '/app/dist');
    }

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser());

    // Error handler - has to be last
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
};