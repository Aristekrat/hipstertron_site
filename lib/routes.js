'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

module.exports = function(app) {
    // Dev routes
    app.route('/sitemap')
        .get(index.sitemap);

    app.route('/loaderio-d1a10af7d77fa516e587cc52703e49d4/')
        .get(index.loaderIo);

    app.route('/plato')
        .get(index.plato);

    // Concert Routes
    app.route('/get-concerts/:section')
        .get(api.processResponse);

    // Email Routes
    /*app.route('/submit-email')
        .post(api.submitEmail);
        */

    // Gen Purpose
    app.route('/')
        .get(index.index);

    app.route('*')
        .get(index.index);
};