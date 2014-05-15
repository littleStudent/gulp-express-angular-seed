angular.module('expAng', [
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'ui.route',
	'ui.router',
	'expAng.system',
	'expAng.config',
	'expAng.route',
	'expAng.home'
]);

angular.module('expAng.system', []);
angular.module('expAng.home', []);