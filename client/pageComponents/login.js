'use strict';



var React = require('react'); 
var LoginForm = require("./profile/LoginForm");


var login = React.createClass( {
	getInitialState:function() {
		return {
			errors: {},
			profile: {
				username: '',
				password: ''
			}
		}
	},

	render: function() {
		return (
			<div> 
				<h1> Log In </h1>

				<LoginForm 

					profile={this.state.profile}
				/>
			</div>

		);
	}

});

module.exports = login;