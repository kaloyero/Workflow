'use strict';

angular.module('myApp.confirmacion', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/confirmacion', {
    templateUrl: 'confirmacion/confirmacion.html',
    controller: 'ConfirmacionCtrl'
  });
}])

.controller('ConfirmacionCtrl', [function() {

}]);