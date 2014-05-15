angular.module('expAng.config', ['ui.router'])
	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
}]);