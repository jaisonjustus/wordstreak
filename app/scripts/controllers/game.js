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

	$scope.addSelectedWord = function()	{
		var updatedPoint = 0,
				totalScoreIncrementor = null,
				selectors = [];

		if(WordBuilder.getLetters().length > 0)	{

			$scope.words.push(WordBuilder.process());
			updatedPoint = $scope.totalScore + WordBuilder.getPoints();
			selectors = WordBuilder.getSelectors();

			/* Timer to animate the shift in the total point. */
			totalScoreIncrementor = setInterval(function()	{
				if($scope.totalScore !== updatedPoint)	{
					$scope.totalScore += 1;
					$scope.$apply();
				}else	{
					clearInterval(totalScoreIncrementor);
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

	$scope.clearSelectedWord = function()	{
		var selectors = WordBuilder.getSelectors();

		selectors.forEach(function(selector)	{
			selector.attr('data-selected-temp', 'false');
			selector.removeClass('gameboard__tile_selected');
		});

		WordBuilder.flush();
	}

	$scope.removeWord = function(item)	{
		var word = item.word,
				point = item.point,
				wordIndex = -1,
				wordObject = null,
				updatedPoint = 0,
				totalScoreDecrementor = null;

		$scope.words.forEach(function(item, index)	{
			if(item.word === word)	{
				wordObject = item;
				wordIndex = index;
			}
		});

		$scope.words.splice(wordIndex, 1);

		updatedPoint = $scope.totalScore - point;
		
		totalScoreDecrementor = setInterval(function()	{
			if($scope.totalScore !== updatedPoint)	{
				$scope.totalScore -= 1;
				$scope.$apply();
			}else	{
				clearInterval(totalScoreDecrementor);
			}
		},20);

		
		wordObject.selectors.forEach(function(selector)	{
			selector.attr('data-selected-temp', 'false');
			selector.attr('data-selected', 'false');
			selector.attr('data-selected-word', '');
			selector.removeClass('gameboard__tile_disabled');
			selector.removeClass('gameboard__tile_selected');
		});
	};

	$scope.startGame = function()	{
		resetGameParams();
		$scope.gameStatus = true;
		var gameTimer = setInterval(function()	{
				if($scope.gameTime)	{
					$scope.gameTime--;
					$scope.$apply();
				}else	{
					$scope.gameStatus = false;
					$scope.$apply();
					clearInterval(gameTimer);
				}
			},1000);
	};

	var resetGameParams = function()	{
		$scope.gameTime = 60;
		$scope.words = [];
		$scope.totalScore = 0
		$scope.matrix = WordMatrix.generate();
	}

});