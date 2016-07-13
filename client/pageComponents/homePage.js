'use strict';

var Helmet = require('helmet');
var React = require('react'); 
var Link = require('react-router').Link;
var Card = require("../Card");

var homePage = React.createClass( function() {
	render: function() {
		return (
			<div>
<<<<<<< HEAD
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
=======
				<div>
				</div>
				<div>
					<h1> Welcome to </h1><img src="images/unoLogo.png"/><h1>Online!</h1>
				</div>
				<div>
					<ul>
						<li><Link to = "/login"> <Card color="red" num="Log In" /></Link></li>
						<li><Link to = "/register"> <Card color="blue" num="Sign Up" /></Link></li>
						<li><Link to = "/game"><Card color="red" num="Skip To Game" /></Link></li>
					</ul>
				</div>
>>>>>>> 7781fc18f0a9bc0d41eac1deedd4a4798e84ff60
			</div>

		);
	}

});

module.exports = homePage;

// 