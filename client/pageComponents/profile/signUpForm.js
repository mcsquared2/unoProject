'use strict'

var React = require ('react');
var TextInput = require ('../common/TextInput');
var SignUpModal = require ('../modals/ModalForm');


var signUpForm = React.createClass({
	render: function() {
		return(
			<form>
				<TextInput
					name = 'name'
					placeholder = "Name"
					value = {this.props.profile.name}
					saveProfileState = {this.props.saveProfileState}
					/>
				<TextInput
					name = 'email'
					placeholder = "Email"
					value = {this.props.profile.email}
					saveProfileState = {this.props.saveProfileState}
					/>
				<TextInput
					name = "username"
					placeholder = "Username"
					value = {this.props.profile.username}
					saveProfileState = {this.props.saveProfileState}
					/>
				<TextInput
					name = "password"
					placeholder = "Password"
					value = {this.props.profile.password}
					saveProfileState = {this.props.saveProfileState}
					/>
			</form>


		);
	}
});

module.exports = signUpForm;