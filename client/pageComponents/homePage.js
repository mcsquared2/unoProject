'use strict';

var React = require('react'); 
var Link = require('react-router').Link;
var Card = require("../Card");

var homePage = React.createClass( {
	render: function() {
		return (
			<div className = "mainpagebody">
				<div>
				</div>
				<div className = "mainpageheader"  >
					<h1> Welcome to <div className = "mainpageUnofont">UNO</div>  Online!</h1>
				</div>
				<div>
					<ul>
						<li><Link to = "/login"> <Card color="red" num="Log In" /></Link></li>
						<li><Link to = "/register"> <Card color="blue" num="Sign Up" /></Link></li>
						<li><Link to = "/yourgame"><Card color="red" num="Skip To Game" /></Link></li>
					</ul>
				</div>
			</div>

		);
	}

});

module.exports = homePage;

// 