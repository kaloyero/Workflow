'use strict';

angular.module('myApp.waiting', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/waiting', {
    templateUrl: 'waiting/waiting.html',
    controller: 'WaitingCtrl'
  });
}])

.controller('WaitingCtrl', [function() {

}]);