'use strict';

var childProcess = require('child_process');
var electron = require('electron');
var gulp = require('gulp');

gulp.task(
	'start',
	gulp.series(
		'build',
		gulp.parallel('watch', function(done) {
			childProcess
				.spawn(electron, ['.'], {
					stdio: 'inherit',
				})
				.on('close', function() {
					// User closed the app. Kill the host process.
					process.exit();
				});
			done();
		}),
	),
);
