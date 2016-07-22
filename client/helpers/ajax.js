'use strict';

var $ = require('jquery');

var ajax = function (url, data, type) {
	
	var method = type || 'POST';
	console.log(JSON.stringify(data))
	return $.ajax({
		url: 'http://localhost:8000' + url,
		datatype: 'json',
		contentType: 'application/json',
		type: method,
		data: JSON.stringify(data)
	});
};

module.exports = ajax;