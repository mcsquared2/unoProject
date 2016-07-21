'use strict';


var React = require('react'); 
var TextInput = require('../common/TextInput');

var LoginForm = React.createClass({
	render: function() {
		return (
			<form>

				<TextInput
					name="Username"
					placeholder="Username"
					value={this.props.profile.username}
					saveProfileState={this.props.saveProfileState}
				 />


				<TextInput 
					name='password'
					placeholder='Password'
					value={this.props.profile.password}
					saveProfileState={this.props.saveProfileState}
				/>


				<input
				
				type="submit" 
				value='Continue' 
				// onClick={this.props.saveTodo}
				// href='/TodoPage'
				/>
			</form>

		);
	}

});

module.exports = LoginForm;