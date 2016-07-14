'use strict';

var React = require('react'); 
var signUpForm = require('../common/signUpForm')

var signUp = React.createClass({
	getInitialState:function() {
		return{
			profile: {
				name: '',
				email: '',
				username: '',
				password: '',

			}
		}
	},

	saveProfileState:function(event){
		var field = event.target.name;
		var value = event.target.value;

	},


	render: function () {
		return (
			<div>
				<h1> Sign Up </h1>
			</div>

			<LoginForm
				profile = {this.state.profile}
				
			/>

		);
	}

});

module.exports = signUp;