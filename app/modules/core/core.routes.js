'use strict';

module.exports = function(app) {
	var core = require('./core.controller');
	app.get('/', core.index);
};