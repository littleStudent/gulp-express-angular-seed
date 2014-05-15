var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		appName: 'expAng',
		description: '',
		keywords: ''
	},
	root: rootPath,
	port: process.env.PORT || 3000
};
