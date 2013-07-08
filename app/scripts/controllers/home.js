'use strict';

angular.module('WordStreak')
.controller('HomeController', function ($scope) {
	
	$scope.options = [{
		id : 1,
		 name : 'Single Play'
	},{
		id : 2,
		name : 'Multiplayer'
	}];


	$scope.routeView = function(viewId)	{
			
	};

});
