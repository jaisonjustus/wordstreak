'use strict'

angular.module('WordStreak')
.service('WordMatrix', function()	{

	var characterSet = 'ABCDEFGHIJKLNOPQRSTUVWXYZ',
			wordMatrix = [],
			matrixSize = 25;

	var generateWordMatrix;

	generateWordMatrix = function()	{
		wordMatrix = [];

		for(var i = 0; i < matrixSize; i++)	{
			wordMatrix.push(characterSet[Math.floor(Math.random() * 25)]);
		}

		return wordMatrix;
	}

	return {
		generate : function()	{
			return generateWordMatrix();
		}
	}

});