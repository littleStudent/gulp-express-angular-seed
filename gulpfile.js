var gulp = require('gulp');

var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var inject = require('gulp-inject');
var config = require('./config/config');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bowerFiles = require('main-bower-files');
var sass = require('gulp-sass');



gulp.task('cpy_js_initFirst_production', function () {
	return gulp.src('public/modules/init/*.js')
		.pipe(concat('_init.js'))
//		.pipe(gulp.dest('build/js/'))
//		.pipe(rename('_init.min.js'))
//		.pipe(uglify())
		.pipe(gulp.dest('build/js/'));
});

gulp.task('cpy_js_production', ['cpy_js_initFirst_production'], function () {
	return gulp.src(['public/modules/**/*.js', '!public/modules/init/*.js'])
		.pipe(concat('all.js'))
//		.pipe(gulp.dest('build/js/'))
//		.pipe(rename('all.min.js'))
//		.pipe(uglify())
		.pipe(gulp.dest('build/js/'));
});


gulp.task('inject_js', function () {
	return gulp.src('app/views/layout.html')
		.pipe(inject(gulp.src(['build/lib/**/*.js', 'build/js/**/*.js', 'build/css/**/*.css', 'build/lib/**/*.css'],
				{read: false}),
			{ignorePath: '/build'}))
		.pipe(gulp.dest('build/serverViews/'));
});


gulp.task('cpy_swig', function () {
	return gulp.src(['app/views/**/'])
		.pipe(gulp.dest('build/serverViews/'));
});

gulp.task('cpy_views', function () {
	return gulp.src(['public/modules/**/*.html'])
		.pipe(gulp.dest(config.root + '/build/views/'));
});

gulp.task('cpy_css', function () {
	return gulp.src([config.root + '/public/**/*.scss'])
		.pipe(sass({sourceComments: 'map', sourceMap: 'sass', style: 'compact'}))
		.pipe(gulp.dest('build/css/'));
});

gulp.task('cpy_lib', function () {
	return gulp.src(bowerFiles(), {base: 'bower_components/'})
		.pipe(gulp.dest('build/lib/'));
});

gulp.task('cpy_img', function () {
	return gulp.src(['public/img/**/'])
		.pipe(gulp.dest('build/img/'));
});

gulp.task('hint', function () {
	return gulp.src(['*.js', 'public/**/*.js', '!public/lib/**', 'app/models/**'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'));
});





gulp.task('default', ['clean', 'hint'], function () {
	gulp.run('production_Task');
});
gulp.task('production_Task', ['scripts_production'], function () {
	gulp.run('browser-sync');
});
gulp.task('scripts_production', ['cpy_img', 'cpy_lib', 'cpy_css', 'cpy_views',
		'cpy_swig', 'cpy_js_production'],
	function () {
		gulp.run('inject_js');
	}
);



gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
		port: 5000,
		notify: true
	});
});

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
		verbose: true,
		script: 'server.js',
		ext: 'js html scss',
		ignore: ['build', 'bower_components', 'node_modules', '.sass-cache', '.idea', '.git']
	}).on('start', function () {
		if (!called) {
			called = true;
			cb();
		}
	}).on('change', function () {
		gulp.run('reload-browser');
	});
});

gulp.task('reload-browser', ['server_restart'], function () {
	setTimeout(function () {
		reload({ stream: false });
	}, 1000);
});
gulp.task('server_restart', ['clean', 'hint'], function () {
	gulp.run('scripts_production');
});
gulp.task('clean', function () {
	return gulp.src('build/', {read: false})
		.pipe(rimraf());
});