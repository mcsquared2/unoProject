'use strict';

var React = require('react');

var Window = React.createClass({
	
	render: function () {
		// console.log("this is inside the window render")
		return (
			<div className="container">
					{this.props.children}
			</div>
		);
	}
});

module.exports = Window;