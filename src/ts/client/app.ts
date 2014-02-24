/// <reference path="../definitions/angularjs/angular.d.ts" />
/// <reference path="../definitions/angularjs/angular-route.d.ts" />
/// <reference path="../definitions/socket.io/socket.io.d.ts" />
/// <reference path="../definitions/angular-socket-io/socket.d.ts" />

var angular = require('angular');
require('ngRoute');
require('ngSocket');

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'btford.socket-io']);

myApp.controller('sceneCtrl', require('./controllers/sceneCtrl.js').sceneCtrl);
//myApp.controller('configCtrl', require('./controllers/configCtrl.js').configCtrl);
myApp.directive('scene', require('./directives/sceneDirective.js').scene);
//myApp.directive('radarBars', require('./directives/radarBarsDirective.js').radarBars);
//myApp.service('configService', require('./services/configService.js').configService);

myApp.factory('mySocket', function (socketFactory) {
  return socketFactory();
});

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
