'use strict';

var helmet = require('helmet')
var React = require('react'); 

var mainGame = React.createClass( function() {
	render: function() {
		return (
			<div>
				<helmet title = "UNO" />
			</div>
			<div>
				<h1> UNO </h1>
			</div>

		)
	}

});

module.exports = mainGame;