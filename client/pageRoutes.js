'use strict';

var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var HomePage = require('./pageComponents/homePage');
var LoginPage = require('./pageComponents/login');
var RegisterPage = require('./pageComponents/signUp');
var GamePage = require('./pageComponents/mainGame');

var Window = require('./window');

var routes = (
	<Route path="/" component={Window}>
		<IndexRoute component={HomePage} />
		<Route path="/login" component={LoginPage} /> 
		<Route path="/register" component={RegisterPage} />
		<Route path="/game" component={GamePage} />

	</Route>
);

module.exports = routes;