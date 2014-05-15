'use strict';

module.exports = function(app) {

	var home = require('./home.api');
	app.get('/home', home.show);
};