'use strict';

var React = require('react'); 
var SignUpForm = require('./profile/signUpForm');


var signUp = React.createClass({
	getInitialState:function() {
		return{
			profile: {
				name: '',
				email: '',
				username: '',
				password: ''

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
				<h1> Sign Up here</h1>
				<SignUpForm 
					profile={this.state.profile}
				/>

				

			</div>

		);
	}

});

module.exports = signUp;

			