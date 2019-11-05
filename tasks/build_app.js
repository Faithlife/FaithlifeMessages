'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jetpack = require('fs-jetpack');
var bundle = require('./bundle');
var utils = require('./utils');

var projectDir = jetpack;
var srcDir = jetpack.cwd('./src');
var destDir = jetpack.cwd('./app');

gulp.task('bundle', function() {
	return Promise.all([bundle(srcDir.path('background.js'), destDir.path('background.js'))]);
});

gulp.task('environment', function(done) {
	var configFile = 'config/env_' + utils.getEnvName() + '.json';
	projectDir.copy(configFile, destDir.path('env.json'), { overwrite: true });
	done();
});

gulp.task('watch', function(done) {
	var beepOnError = function(done) {
		return function(err) {
			if (err) {
				utils.beepSound();
			}
			done(err);
		};
	};

	watch(
		'src/**/*.js',
		batch(function(events, done) {
			gulp.start('bundle', beepOnError(done));
		}),
	);
	watch(
		'src/**/*.less',
		batch(function(events, done) {
			gulp.start('less', beepOnError(done));
		}),
	);
	done();
});

gulp.task('build', gulp.series('bundle', 'environment'));
