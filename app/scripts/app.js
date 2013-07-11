'use strict';

angular.module('WordStreak', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
