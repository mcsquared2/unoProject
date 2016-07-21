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
						<li className = "mainpagecardcss"><Link to = "/login" ><img src="images/images/UnoCons/LogInCard.png" height = "350" width = "300"/> </Link></li>
						<li className = "mainpagecardcss"><Link to = "/register"> <img src="images/images/UnoCons/SignUpCard.png" height = "350" width = "300"/> </Link></li>
						<li className = "mainpagecardcss"><Link to = "/yourgame"><img src="images/images/UnoCons/PlayGameCard.png" height = "350" width = "300"/> </Link></li>
					</ul>
				</div>
			</div>

		);
	}

});

module.exports = homePage;

// 

// "images/images/UnoCons/LogIn.png" 