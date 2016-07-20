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
				<div className = "mainpageheader" >

					<h1 className = "welcome">Welcome to</h1><div className = "mainpageUnofont">UNO</div>  <h1 className = "online">Online!</h1>
				</div>


				<div>
					<ul>
						<li><Link to = "/login"> <Card color="red mainpagecardcss inconDiv" image="images/images/UnoCons/LogIn.png" /></Link></li>
						<li><Link to = "/register"> <Card color="blue mainpagecardcss inconDiv" num="Sign Up" /></Link></li>
						<li><Link to = "/yourgame"><Card color="red mainpagecardcss inconDiv" num="Play Game" /></Link></li>
					</ul>
				</div>
			</div>

		);
	}

});

module.exports = homePage;

// 