'use strict'

angular.module('WordStreak')
.controller('GameController', function($scope, WordMatrix)	{

	var selectors = [],
			selector = null;

	$scope.streak = [];

	$scope.currentStreak = [];

	$scope.matrix = WordMatrix.generate();

	$scope.tileSelected = function(letter, $event)	{
		selector = angular.element($event.target);
		if(selector.attr('data-selected-temp') !== 'true')	{
			selectors.push(selector);
			$scope.currentStreak.push(letter);
			selector.attr('data-selected-temp', 'true');
			selector.addClass('gameboard__tile_selected');
		}
	};

	$scope.addWord = function()	{
		if($scope.currentStreak.length > 0)	{
			$scope.streak.push($scope.currentStreak.join(''));
			selectors.forEach(function(selector)	{
				selector.attr('data-selected-temp', 'true');
				selector.attr('data-selected', 'true');
				selector.attr('data-selected-word', $scope.currentStreak.join(''));
				selector.addClass('gameboard__tile_disabled');
				selector.addClass('gameboard__tile_selected');
			});
			$scope.currentStreak = [];
		}
	};

	$scope.clearWord = function()	{
		$scope.currentStreak = [];
		selectors.forEach(function(selector)	{
			selector.attr('data-selected-temp', 'false');
			selector.removeClass('gameboard__tile_selected');
		});
	}

});