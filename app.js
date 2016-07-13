'use strict';
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res)
{
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(8000, function() {
	console.log('Our app is using port 8000')
});
// console.log('Listening on port 8000');