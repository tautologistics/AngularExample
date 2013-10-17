'use strict';

angular.module('App', ['ngResource', 'ui.bootstrap', 'ui.select2', 'uuid4'])

  .config(['$provide', '$routeProvider', '$locationProvider', function ($provide, $routeProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])
  ;
