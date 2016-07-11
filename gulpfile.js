'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // run local server (dev)
var open = require('gulp-open'); // open our default browser
var browserify = require('browserify'); // bundle javascript and lets us use the common js pattern in the front end
var reactify = require('reactify'); // transpile our JSX to JS
var source = require('vinyl-source-stream'); // use conventionaltext stream with gulp
var concat = require('gulp-concat'); // concatenate our files

var config = {
	port: 9042
}


