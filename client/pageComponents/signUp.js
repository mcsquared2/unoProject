'use strict';

var Helmet = require('helmet')
var React = require('react'); 

var signUp = React.createClass( function() {
	render: function() {
		return (
			<div>
				<helmet title = "Sign Up" />
			</div>
			<div>
				<h1> Sign Up </h1>
			</div>

		);
	}

});

module.exports = signUp;