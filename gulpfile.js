'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // run local server (dev)
var open = require('gulp-open'); // open our default browser
var browserify = require('browserify'); // bundle javascript and lets us use the common js pattern in the front end
var reactify = require('reactify'); // transpile our JSX to JS
var source = require('vinyl-source-stream'); // use conventional text stream with gulp
var concat = require('gulp-concat'); // concatenate our files

var config = {
	port: 9042,
	devBaseUrl: "http://localhost",
	
	paths : {
		html: './client/*.html',
		js: './**/*.js',
		mainJs: './client/main.js',
		images: './client/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/build/toastr.css'
			],
		dist: './dist'
	}
}


//setup for our dev server
// gulp.task('connect', function() {
// 	console.log('connect is opened')
// 	connect.server({
// 		root: ['dist'],
// 		port: config.port,
// 		base: config.devBaseUrl,
// 		livereload: true
// 	});
// });


// // Depends on connect task, and will auto run default browser
// gulp.task('open', ['connect'], function () {
// 	console.log('open is opened')

// 	gulp.src('dist/index.html')
// 		.pipe(open({uri:config.devBaseUrl + ':' + config.port + '/'}));
// });

// take html files from src dir and put them in dist dir, and refresh 
gulp.task('html', function() {
	console.log('html is opened')

	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// take css files from src dir and put them in dist dir, and refresh 
gulp.task('css', function () {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('images', function () {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
});


gulp.task('js', function () {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	// gulp.watch(config.paths.css, ['css']);

});


gulp.task('default', ['html', 'css','js', 'watch' ]);

