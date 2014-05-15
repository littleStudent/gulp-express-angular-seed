'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	compress = require('compression'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path'),
	glob = require('glob');

module.exports = function() {
	// Initialize express app
	var app = express();


	// Setting the environment locals
	app.locals.appName = config.app.appName;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;


	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('html', consolidate['swig']);

	// Set views path and view engine
	app.set('view engine', 'html');
	app.set('views', config.root + '/build/serverViews/');


	// Setting the app router and static folder
	app.use(express.static(config.root + '/build'));


	glob('./app/modules/**/*.routes.js', null, function(err,files){
		if(err) throw err;
		files.forEach(function(routePath){
			require(path.resolve(routePath))(app);
		});
	});


	return app;
};
