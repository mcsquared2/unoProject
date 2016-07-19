'use strict';

var React = require('react'); 
var Link = require('react-router').Link;
var Card = require("../Card");

var homePage = React.createClass( {
	render: function() {
		return (
			<div>
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
			</div>

		);
	}

});

module.exports = homePage;

// 