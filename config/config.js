var _ = require('underscore'),
	utilities = require('./utilities');

// Load app configuration

process.env.NODE_ENV = ~utilities.walk('./config/env', /(.*)\.js$/).map(function(file) {
	return file.split('/').pop().slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

module.exports = _.extend(
    require(__dirname + '/env/all.js'),
    require(__dirname + '/env/' + process.env.NODE_ENV + '.js') || {});