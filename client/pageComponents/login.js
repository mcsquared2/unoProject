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

	saveProfileState: function(event){
		var field = event.target.name;
		var value = event.target.value;
		var newProfile = Object.assign({}, this.state.profile);

		// sort of like todo.title or todo.discription
		newProfile[field] = value;

		this.setState({
			profile: newProfile
		});
		// console.log(this.state.todo);
	},

	render: function() {
		return (
			<div> 
				<h1> Log In </h1>

				<LoginForm 
					profile={this.state.profile}
					saveProfileState={this.saveProfileState}
				/>
				
			</div>

		);
	}

});

module.exports = login;