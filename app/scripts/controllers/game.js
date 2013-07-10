'use strict'

angular.module('WordStreak')
.controller('GameController', function($scope, WordMatrix)	{

	var selectors = [],
			selector = null;

	$scope.streak = [];
	$scope.streakSelector = {};
	$scope.totalScore = 0;
	$scope.gameTime = 60;

	$scope.currentStreak = [];
	$scope.currentPoint = 0;

	$scope.gameStatus = false;

	$scope.matrix = WordMatrix.generate();

	$scope.tileSelected = function(tile, $event)	{
		selector = angular.element($event.target);
		if(selector.attr('data-selected-temp') !== 'true')	{
			selectors.push(selector);
			$scope.currentStreak.push(tile.letter);
			$scope.currentPoint += parseInt(tile.point);
			selector.attr('data-selected-temp', 'true');
			selector.addClass('gameboard__tile_selected');

			$scope.currentWord = $scope.currentStreak.join('');
		}
	};

	$scope.addWord = function()	{
		if($scope.currentStreak.length > 0)	{
			$scope.streak.push({
				word : $scope.currentStreak.join(''),
				point : $scope.currentPoint
			});
			
			var temp = $scope.totalScore + $scope.currentPoint;
			var timer = setInterval(function()	{
				if($scope.totalScore !== temp)	{
					$scope.totalScore += 1;
					$scope.$apply();
				}else	{
					clearInterval(timer);
				}
			},20);

			// $scope.totalScore += $scope.currentPoint;


			selectors.forEach(function(selector)	{
				selector.attr('data-selected-temp', 'true');
				selector.attr('data-selected', 'true');
				selector.attr('data-selected-word', $scope.currentStreak.join(''));
				selector.addClass('gameboard__tile_disabled');
				selector.addClass('gameboard__tile_selected');
			});
			$scope.streakSelector[$scope.currentStreak.join('')] = selectors;
			$scope.currentStreak = []; 
			$scope.currentPoint = 0;
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

	$scope.removeWordFromStreak = function(set)	{
		var word = set.word,
				index = $scope.streak.indexOf(word),
				selectors = $scope.streakSelector[word];

		var temp = $scope.totalScore - set.point;
			var timer = setInterval(function()	{
				if($scope.totalScore !== temp)	{
					$scope.totalScore -= 1;
					$scope.$apply();
				}else	{
					clearInterval(timer);
				}
			},20);

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

	$scope.startGame = function()	{
		$scope.gameTime = 60;
		$scope.gameStatus = true;
		$scope.streak = [];
		var gameTimer = setInterval(function()	{
				if($scope.gameTime)	{
					$scope.gameTime--;
					$scope.$apply();
				}else	{
					$scope.gameStatus = false;
					$scope.streakSelector = {};
					$scope.totalScore = 0;
					$scope.gameTime = 60;
					$scope.$apply();
					clearInterval(gameTimer);
				}
			},1000);
	}

});