/*jslint node: true */
'use strict';
var express = require('express'),
    routes = require('./routes'),
    app = express();

app.use(express.logger('dev'));

app.use(express.bodyParser());

app.get('/api/contacts', routes.contacts);

app.use(function (req, res) {
    res.json({'ok': false, 'status': '404'});
});

module.exports = app;