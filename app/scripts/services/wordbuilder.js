'use strict'

angular.module('WordStreak')
.service('WordBuilder', function()	{

	var WordBuilder = {

		/* Array of letters for building the word. */
		_letters : [],

		/* Sum of points awarded to the letters in the word. */
		_point : 0,

		/* Letter tile DOM selector array. */
		_selectors : [],

		/**
		 * Reset the word properties like letters, points and selectors.
		 * @method flush
		 * @access public
		 */
		flush : function()	{
			this._letters = [];
			this._point = 0;
			this._selectors = [];
		},

		/**
		 * Get the letters array.
		 * @method getLetter
		 * @access public
		 * @return array
		 */
		getLetters : function() { return this._letters; },

		/**
		 * Get the word.
		 * @method getWord
		 * @access public
		 * @return string
		 */
		getWord : function() { return this._letters.join(''); },

		/**
		 * Get the points.
		 * @method getPoints
		 * @access public
		 * @return int
		 */
		getPoints : function()	{ return this._point },

		/**
		 * Get the selectors array.
		 * @method getSelectors
		 * @access public
		 * @return array
		 */
		getSelectors : function()	{ return this._selectors },

		/**
		 * Add letter to the letters array.
		 * @method addLetter
		 * @access public
		 * @param string letter
		 */
		addLetter : function(letter)	{
			this._letters.push(letter);
		},

		/**
		 * Add points for the word as far formed.
		 * @method addPoint
		 * @access public
		 * @param int point
		 */
		addPoint : function(point)	{
			this._point += point;
		},

		/**
		 * Add DOM selector for future references.
		 * @method addSelector
		 * @access public
		 * @param object selector
		 */
		addSelector : function(selector)	{
			this._selectors.push(selector);
		},

		/**
		 * Build the word and return it along with the associated parameters like
		 * point and selectors.
		 * @method process
		 * @access public
		 * @return object
		 */
		process : function()	{
			var self = this;

			return	{
				word : self._letters.join(''),
				point : self._point,
				selectors : self._selectors
			};
		}

	};

	return WordBuilder;

});