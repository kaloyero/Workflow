'use strict';

angular.module('myApp.calendar', ['ngRoute', 'datatables'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar/calendar.html',
        controller: 'calendarController'

    });
}])


.controller('calendarController', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder,EventosFactory,ngDialog,UsuariosFactory,TipoEventosFactory) {

makeCalendar();

function makeCalendar() {
    console.log("HOLA")

$('#calendario').fullCalendar({events: 'php/calendarController.php',    eventClick: function(calEvent, jsEvent, view) {

getEvento(calEvent.Id)

        }})

}
function getEvento(idEvento) {
    EventosFactory.query({ id: idEvento },$scope.onSuccessGetEvento)

}
 $scope.onSuccessGetEvento = function (data) {
        console.log("DATAGET",data)
         $scope.evento=data[0]

             ngDialog.open({
                    template: 'evento/editRead.html',
                    className: 'edicionForm ngdialog-theme-default',
                    scope:$scope
            });
        
            getUsuarios(function (){ setUsuarioCreador()});
            getTipoEventos(function(){setTipoEvento()});


       }


  function getUsuarios(callback) {
          UsuariosFactory.query(null,function(data) {
                      $scope.usuarios= JSON.parse(angular.toJson(data))
                      //setUsuarioCreador(usuarios)
                      callback();
              } );

      }
     function setUsuarioCreador(){
         console.log("SCOPE",$scope)
         for (var x in $scope.usuarios) {
             if ($scope.usuarios[x]["Id"]==$scope.evento["IdUsuarioComercial"]){
                // $scope.usuarios[x].ticked = true;
                $scope.evento["UsuarioComercial"] = $scope.usuarios[x]["Nombre"];
                 break;
             }
         }

     }
function getTipoEventos(callback){
    TipoEventosFactory.query(null,function(data) {
                  $scope.TipoEventos= JSON.parse(angular.toJson(data))
                  //setUsuarioCreador(usuarios)
                  callback();
          } );

}
 function setTipoEvento(){
console.log("TIPO")
     for (var x in $scope.TipoEventos) {
         if ($scope.TipoEventos[x]["Id"]==$scope.evento["IdTipoEvento"]){
console.log("SIEVENT",$scope.TipoEventos[x])
            $scope.evento["TipoEvento"] = $scope.TipoEventos[x]["Nombre"];
             break;
         }
     }

 }



});