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

    app.route('/*')
        .get(index.index);
};