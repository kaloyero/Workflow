'use strict';

angular.module('myApp.evento', ['ngRoute','ngDialog','ngMask'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/evento', {
    templateUrl: 'evento/alta.html',
    controller: 'EventoCtrl'
  });
}])

.controller('EventoCtrl', ['$scope', 'EventosFactory', 'ClientesFactory','UsuariosFactory','$location','ngDialog','TipoEventosFactory',
function ($scope, EventosFactory, ClientesFactory,UsuariosFactory,$location,ngDialog,TipoEventosFactory) {
    $scope.pruebas = [
            {
                nombre : "Israel Parra"
            }
        ]
    $scope.primera=0
    $scope.segunda=0
    getClientes();
    getUsuarios();
getTipoEventos();
      // in controller
      angular.element(document).ready(function () {
          console.log("LISTO")

      });
     $scope.onSuccess = function (data) {
         $scope.prueba=$scope.pruebas[0];
	console.log("DATA",data)

           ngDialog.open({
                  template: '<p>Se ha creado el evento '+data.nombre+' con el codigo '+data.codigo+'</p>',
                  plain: true,
                  scope:$scope
          });

         $location.path('/pending');
       };
       //Controla el Select para ver si agrego si es requerido o no ,el plugin que me baje del select no cumple esa funcion.Le agrego un Watch.Mejorar
     $scope.$watch(function (scope) {
            if ($scope.evento!=null) return $scope.evento.clienteId },
                  function (newValue, oldValue) {
                      if ( $scope.primera!=0 || (newValue!=null && newValue.length > 0)) {
                      if (newValue!=null && newValue.length <= 0) {
                          //$("#selectCliente").find("button").css("color","red");
                          $("#spanClienteError").addClass("ng-show")
                          $("#spanClienteError").removeClass("ng-hide")


                      } else {
                          $scope.primera=1;
                         // $("#selectCliente").find("button").css("color","black");
                            $("#spanClienteError").removeClass("ng-show")
                               $("#spanClienteError").addClass("ng-hide")

                      }
                  }
                  });
                  $scope.$watch(function (scope) {
                         if ($scope.evento!=null) return $scope.evento.usuarioId },
                               function (newValue, oldValue) {
                                   if ( $scope.segunda!=0 || (newValue!=null && newValue.length > 0)) {
                                   if (newValue!=null && newValue.length <= 0) {
                                       $("#spanUsuarioError").addClass("ng-show")
                                       $("#spanUsuarioError").removeClass("ng-hide")


                                   } else {
                                       $scope.segunda=1;
                                         $("#spanUsuarioError").removeClass("ng-show")
                                            $("#spanUsuarioError").addClass("ng-hide")

                                   }
                               }
                               });
        ///FIN HACK
       $scope.createNewEvento = function () {
           EventosFactory.save($scope.evento,$scope.onSuccess);

       };
       function getClientes() {
           ClientesFactory.query(null,function(data) {
                       $scope.clientes= JSON.parse(angular.toJson(data))

               } );

       }
       function getUsuarios() {
              UsuariosFactory.query(null,function(data) {
                          $scope.usuarios= JSON.parse(angular.toJson(data))

                  } );

          }
          function getTipoEventos(){
              TipoEventosFactory.query(null,function(data) {
                            $scope.tipoEventos= JSON.parse(angular.toJson(data))
                         ;
                    } );

          }

}]).directive('numberMask', function() {//Manejo del PLugin de mascara de Numeros.Mejorar
              return function(scope, element, attrs) {
                      var value = element.val();
                      if ($(element).hasClass("ale")){
                          element.on('blur', function(e) {

                                 var resultado= /^-?\d*(\,\d{1,2})?$/.test(element.val());
                                 console.log("RES",resultado)
                                             if (!resultado ) {
                                                 element.val(value);
                                                 console.log("VALUE",value)
                                                 if (value=="" || value <0){
                                                     console.log("ENTRA", $("#spanPresupuestoError"))
                                                      $("#spanPresupuestoError").addClass("ng-show")
                                                     $("#spanPresupuestoError").removeClass("ng-hide")
                                                 }else{
                                                     $("#spanPresupuestoError").removeClass("ng-show")
                                                    $("#spanPresupuestoError").addClass("ng-hide")
                                                 }


                                              } else if (element.val()=="" || element.val()<0){
                                                   element.val(value);
                                                   console.log("ERR1")
                                                    $("#spanPresupuestoError").addClass("ng-show")
                                                    $("#spanPresupuestoError").removeClass("ng-hide")
                                                   value = element.val();
                                              }else{
                                                  console.log("ERR2")

                                                     $("#spanPresupuestoError").removeClass("ng-show")
                                                     $("#spanPresupuestoError").addClass("ng-hide")
                                                       value = element.val();
                                              }


                                })
                      }else{
                           element.on('blur', function(e) {
                              //var resultado= /^-?[\d.]+(?:e-?\d+)?$/.test(element.val());
                               var resultado= /^-?\d*(\,\d{1,2})?$/.test(element.val());

                                           if (!resultado && element.val()!="") {
                                               element.val(value);
                                               console.log("VALOR",value)
                                               if (value=="" || value <0){
                                                   $("#spanBudgetError").addClass("ng-show")
                                                  $("#spanBudgetError").removeClass("ng-hide")
                                               }else{
                                                   $("#spanBudgetError").removeClass("ng-show")
                                                      $("#spanBudgetError").addClass("ng-hide")
                                               }
                                            } else if (element.val()=="" || element.val()<0) {
                                                console.log("LLL",element.val())
                                                element.val(value);
                                                $("#spanBudgetError").addClass("ng-show")
                                                    $("#spanBudgetError").removeClass("ng-hide")
                                            }else{
                                                console.log("LLL5",element.val())
                                                  $("#spanBudgetError").removeClass("ng-show")
                                                        $("#spanBudgetError").addClass("ng-hide")
                                                 value = element.val();
                                            }


                              })
                  }

                  function between(n, min, max) { return n >= min && n <= max; }
              }
          });;