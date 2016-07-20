'use strict';

var $, jQuery;
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var routes = require('./pageRoutes');
var InitializeGameActionCreator = require('./actions/initializeActionCreator');

InitializeActionCreator.initializeApp();


//dood
// console.log("this is inside the main")

ReactDOM.render(
	<Router history={browserHistory}>
		{routes}
	</Router>
	,
	document.getElementById('app')
);

// module.exports = App;