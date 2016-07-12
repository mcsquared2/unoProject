'use strict';

var helmet = require('helmet')
var React = require('react'); 

var homePage = React.createClass( function() {
	render: function() {
		return (
			<div>
				<helmet title = "Home Page" />
			<div>
			<div>
				<h1> Home Page </h1>
			</div>

		)
	}

});

module.exports = homePage;