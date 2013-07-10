'use strict'

angular.module('WordStreak')
.service('WordMatrix', function()	{

	var characterSet = 'ABCDEFGHIJKLNOPQRSTUVWXYZ',
			wordMatrix = [],
			matrixSize = 24;

	var generateWordMatrix;

	generateWordMatrix = function()	{
		wordMatrix = [];

		for(var i = 0; i < matrixSize; i++)	{
			wordMatrix.push({
				letter : characterSet[Math.floor(Math.random() * 25)],
				point : Math.floor(Math.random() * 10)
			});
		}

		return wordMatrix;
	}

	return {
		generate : function()	{
			return generateWordMatrix();
		}
	}

});