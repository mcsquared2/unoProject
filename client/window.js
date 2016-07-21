'use strict';

var React = require('react');

var Window = React.createClass({
	// componentWillUnmount: function () {
	// 	alert("we have unmounted")
	// 	console.log("we have unmounted")
	// },
	render: function () {
		// console.log("this is inside the window render")
		return (
			<div >
					{this.props.children}
			</div>
		);
	}
});

module.exports = Window