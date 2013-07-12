'use strict'

angular.module('WordStreak')
.controller('LoginController', function($scope)	{

	$scope.username = '';
	$scope.password = '';

	$scope.signin = function()	{
		/* call service for sign in. */
	};

	$scope.signup = function()	{
		/* call service for sign up */
	};

	$scope.loadSignupForm = function()	{
		/* load the signup form */
	}

});