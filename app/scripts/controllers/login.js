'use strict'

angular.module('WordStreak')
.controller('LoginController', function($scope)	{

	$scope.username = '';
	$scope.password = '';

	$scope.login = function()	{
		console.log('call login service', $scope.username, $scope.password);
	};

});