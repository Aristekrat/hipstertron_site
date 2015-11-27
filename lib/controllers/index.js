'use strict';

exports.index = function(req, res) {
    res.render('index-min');
};

exports.sitemap = function(req, res) {
    res.sendfile("sitemap.xml");
};

exports.plato = function(req, res) {
    res.render('plato/index');
};

exports.loaderIo = function(req, res) {
    res.sendfile("loaderio-d1a10af7d77fa516e587cc52703e49d4.txt");
};