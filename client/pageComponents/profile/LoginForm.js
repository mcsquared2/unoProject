'use strict';


var React = require('react');
var TextInput = require("../common/TextInput"); 

var LoginForm = React.createClass({
	render: function() {
		return (
			<form>

				<TextInput
					name="Username"
					placeholder="Username"
					value={this.props.profile.username}
				 />


				<TextInput 
					name='password'
					placeholder='Password'
					value={this.props.profile.password}
				/>


				<input
				className="card yellow" 
				type="submit" 
				value='' 
				// onClick={this.props.saveTodo}
				// href='/TodoPage'
				/>
			</form>

		);
	}

});

module.exports = LoginForm;