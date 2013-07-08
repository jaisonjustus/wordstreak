'use strict'

angular.module('WordStreak')
.controller('GameController', function($scope, WordMatrix)	{

	var selectors = [],
			selector = null;

	$scope.streak = [];
	$scope.streakSelector = {};

	$scope.currentStreak = [];

	$scope.matrix = WordMatrix.generate();

	$scope.tileSelected = function(letter, $event)	{
		selector = angular.element($event.target);
		if(selector.attr('data-selected-temp') !== 'true')	{
			selectors.push(selector);
			$scope.currentStreak.push(letter);
			selector.attr('data-selected-temp', 'true');
			selector.addClass('gameboard__tile_selected');

			$scope.currentWord = $scope.currentStreak.join('');
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
			$scope.streakSelector[$scope.currentStreak.join('')] = selectors;
			$scope.currentStreak = [];
			$scope.currentWord = '';
			selectors = [];
		}
	};

	$scope.clearWord = function()	{
		$scope.currentStreak = [];
		selectors.forEach(function(selector)	{
			selector.attr('data-selected-temp', 'false');
			selector.removeClass('gameboard__tile_selected');
		});
		selectors = [];
	}

	$scope.removeWordFromStreak = function(word)	{
		var index = $scope.streak.indexOf(word),
				selectors = $scope.streakSelector[word];

		$scope.streak.splice(index, 1);
		selectors.forEach(function(selector)	{
			selector.attr('data-selected-temp', 'false');
			selector.attr('data-selected', 'false');
			selector.attr('data-selected-word', '');
			selector.removeClass('gameboard__tile_disabled');
			selector.removeClass('gameboard__tile_selected');
		});

		selectors = null;
		delete $scope.streakSelector[word];
	}

});