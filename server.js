var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app        = express();

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Server running on port: ' + port);
