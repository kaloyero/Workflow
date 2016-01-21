'use strict';

angular.module('myApp.cliente', ['ngRoute','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cliente', {
    templateUrl: 'cliente/alta.html',
    controller: 'ClienteCtrl'
  });
}])

.controller('ClienteCtrl', ['$scope','ClientesFactoryABM','$location','ngDialog','$route',
function ($scope, ClientesFactoryABM,$location,ngDialog,$route) {

$scope.cliente= new Object();
$scope.cliente.Habilitado=true;


         $scope.crearCliente=function(){
              ClientesFactoryABM.save($scope.cliente,$scope.onSuccessAlta);

            }
            $scope.onSuccessAlta = function(data) {
                      ngDialog.closeAll()
                      ngDialog.open({
                          template: '<p>El Cliente ha sido creado</p>',
                          plain: true
                      });
                      $route.reload()
                  };





}])





