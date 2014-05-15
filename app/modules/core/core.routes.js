'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('./core.controller');
	app.get('/', core.index);
};