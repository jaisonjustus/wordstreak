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

/* Need to implement ui-router. also check is it possible to share same
controller for hierarchial view routings. */