'use strict';

var React = require('react'); 
var Link = require('react-router').Link;

var homePage = React.createClass( {
	render: function() {
		return (
			<div>
				<div>
				</div>
				<div>
					<h1> Home Page </h1>
				</div>
				<div>
					<ul>
						<li><Link to = "/login"> Log In </Link></li>
						<li><Link to = "/register"> Sign Up </Link></li>
						<li><Link to = "/game"> Skip to Game </Link></li>
					</ul>
				</div>
			</div>

		);
	}

});

module.exports = homePage;