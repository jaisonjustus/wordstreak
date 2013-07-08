'use strict';

angular.module('WordStreak', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
