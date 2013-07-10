'use strict'

angular.module('WordStreak')
.controller('GameController', function($scope, WordMatrix, WordBuilder)	{

	var selector = null;

	$scope.words = [];
	$scope.wordSelector = {};
	$scope.totalScore = 0;
	$scope.gameTime = 60;
	$scope.gameStatus = false;
	$scope.matrix = WordMatrix.generate();

	$scope.tileSelected = function(tile, $event)	{
		selector = angular.element($event.target);
		if(selector.attr('data-selected-temp') !== 'true')	{

			WordBuilder.addLetter(tile.letter);
			WordBuilder.addPoint(parseInt(tile.point));
			WordBuilder.addSelector(selector);

			selector.attr('data-selected-temp', 'true');
			selector.addClass('gameboard__tile_selected');

			// $scope.currentWord = $scope.currentStreak.join('');
		}
	};

	$scope.addWord = function()	{
		var updatedPoint = 0,
				totalScoreUpdater = null,
				selectors = [];

		if(WordBuilder.getLetters().length > 0)	{

			$scope.words.push(WordBuilder.process());
			updatedPoint = $scope.totalScore + WordBuilder.getPoints();
			selectors = WordBuilder.getSelectors();

			/* Timer to animate the shift in the total point. */
			totalScoreUpdater = setInterval(function()	{
				if($scope.totalScore !== updatedPoint)	{
					$scope.totalScore += 1;
					$scope.$apply();
				}else	{
					clearInterval(totalScoreUpdater);
				}
			},20);

			
			selectors.forEach(function(selector)	{
				selector.attr('data-selected-temp', 'true');
				selector.attr('data-selected', 'true');
				selector.attr('data-selected-word', WordBuilder.getWord());
				selector.addClass('gameboard__tile_disabled');
				selector.addClass('gameboard__tile_selected');
			});
			// $scope.streakSelector[$scope.currentStreak.join('')] = selectors;
			
			WordBuilder.flush();
		}
	};

	$scope.clearWord = function()	{
		var selectors = WordBuilder.getSelectors();

		selectors.forEach(function(selector)	{
			selector.attr('data-selected-temp', 'false');
			selector.removeClass('gameboard__tile_selected');
		});

		WordBuilder.flush();
	}

	$scope.removeWordFromStreak = function(set)	{
		var word = set.word,
				index = $scope.words.indexOf(word),
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

		$scope.words.splice(index, 1);
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