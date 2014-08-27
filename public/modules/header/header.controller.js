'use strict';

angular.module('expAng.system').controller('HeaderController', ['$scope',
	function ($scope) {
		$scope.isCollapsed = false;

		$scope.menu = [
			{
				title: 'Home',
				link: 'home',
				uiRoute: '/home'
			}
		];

		$scope.toggleCollapsibleMenu = function () {
			$scope.isCollapsed = !$scope.isCollapsed;
		};
	}
]);