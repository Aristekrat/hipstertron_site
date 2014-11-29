'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index');

/**
 * Application routes
 */
module.exports = function(app) {
    app.route('/get-env')
        .get(api.getEnv);

    app.route('/submit-email')
        .post(api.submitEmail)

    app.route('/*')
        .get(index.index);
};