'use strict'



var React = require('react'); 
var LoginForm = require("./profile/LoginForm");


<<<<<<< HEAD
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
=======
var login = React.createClass( function() {
	render: function() {
		return (
			<div> 
				<h1> Sign Up </h1>
>>>>>>> 117a08654fdea2a909e896c9adc8b5b9713cd48c
			</div>

		)
	}

});

module.exports = login;