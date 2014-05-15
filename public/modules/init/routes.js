'use strict';

// Setting up route
angular.module('expAng.route', []).config(['$stateProvider',
	function ($stateProvider) {
		// Users state routing
		$stateProvider.
			state('/home', {
				url: '/home',
				templateUrl: '/views/home/home.view.html'
			});
	}
]);