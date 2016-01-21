'use strict';

angular.module('myApp.facturacion', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facturacion', {
    templateUrl: 'facturacion/facturacion.html',
    controller: 'FacturacionCtrl'
  });
}])

.controller('FacturacionCtrl', [function() {

}]);

