'use strict';

var $, jQuery;
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
// var routes = require('./routes');
// var InitializeActionCreator = require('./actions/initializeActionCreator');

// InitializeActionCreator.initializeApp();
var Window = React.createClass({
	
	render: function () {
		console.log("this is inside the window render")
		return (
			<div>
				<h1>This is the main.js file</h1>
			</div>
		);
	}
});

//dood
console.log("this is inside the main")

ReactDOM.render(
	<Window />,
	document.getElementById('app')
);

// module.exports = App;