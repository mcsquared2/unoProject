'use strict';

var Helmet = require('helmet');
var React = require('react'); 
var Link = require('react-router').Link;

var homePage = React.createClass( function() {
	render: function() {
		return (
			<div>
				<Helmet title = "Home Page" />
			</div>
			<div>
				<h1> Home Page </h1>
			</div>
			<div>
				<ul>
					<li><Link to = "/login"> Log In </Link></li>
					<li><Link to = "/sign-up"> Sign Up </Link></li>
					<li><Link to = "play-game"> Skip to Game </Link></li>
				</ul>
			</div>

		);
	}

});

module.exports = homePage;