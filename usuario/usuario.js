'use strict';

angular.module('myApp.usuario', ['ngRoute','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuario', {
    templateUrl: 'usuario/alta.html',
    controller: 'UsuarioCtrl'
  });
}])

.controller('UsuarioCtrl', ['$scope','UsuariosFactory','$location','ngDialog','RolesFactory','$route',
function ($scope, UsuariosFactory,$location,ngDialog,RolesFactory,$route) {

$scope.usuario= new Object();
$scope.usuario.Habilitado=true;

    getRoles();
        function getRoles(){
              RolesFactory.query(null,function(data) {
                            $scope.roles= JSON.parse(angular.toJson(data))
                         ;
                    } );

          }
         $scope.crearUsuario=function(){
              UsuariosFactory.save($scope.usuario,$scope.onSuccessAlta);

            }
            $scope.onSuccessAlta = function(data) {
                      ngDialog.closeAll()
                      ngDialog.open({
                          template: '<p>El usuario ha sido creado</p>',
                          plain: true
                      });
                      $route.reload()
                  };





}])





