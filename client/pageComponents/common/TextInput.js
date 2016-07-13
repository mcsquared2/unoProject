'use strict';

var React = require('react');

var TextInput = React.createClass({
	render: function() {
		var wrapperClass =  'form-group';


		if (this.props.error && this.props.error.length > 0) {
			wrapperClass += ' has-error';
		}
		return (
			<div className={wrapperClass}>
				<div className="field">
					<input 
						name={this.props.name}
						className="form-control"
						placeholder={this.props.placeholder}
						value={this.props.value}
						ref={this.props.name}
						onChange={this.props.saveProfileState}

					/>
					<div>{this.props.error}</div>
				</div>
			</div>
		)
	}
});

module.exports = TextInput;