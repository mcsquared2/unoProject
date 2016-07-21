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
						<li><Link to = "/login"> <Card color="yellow mainpagecardcss" num= "Sign In"/></Link></li>
						<li><Link to = "/register"> <Card color="blue mainpagecardcss" num="Sign Up" /></Link></li>
						<li><Link to = "/yourgame"><Card color="red mainpagecardcss" num="Play Now" /></Link></li>
					</ul>
				</div>
			</div>

		);
	}

});

module.exports = homePage;

// 

// "images/images/UnoCons/LogIn.png" 