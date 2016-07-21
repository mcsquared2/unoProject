'use strict';

var React = require('react'); 
var SignUpForm = require('./profile/signUpForm');
var ModalForm = require ('./modals/ModalForm');


	



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
				<ModalForm
					continueButton="Continue"
					header= "We sent you an Email!"
					paragraph= "Please Check your email in order access your password"
					
				/>
				

			</div>

		);
	}

});

module.exports = signUp;

			