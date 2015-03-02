'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

/**
 * Application routes
 */
module.exports = function(app) {
    app.route('/submit-email')
        .post(api.submitEmail)

    app.route('/sitemap')
        .get(index.sitemap);

    app.route('/loaderio-d1a10af7d77fa516e587cc52703e49d4/')
        .get(index.loaderIo);

    app.route('/')
        .get(index.index);
};