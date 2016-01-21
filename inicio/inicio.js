'use strict';

angular.module('myApp.inicio', ['ngRoute','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inicio', {
    templateUrl: 'inicio/inicio.html',
    controller: 'InicioCtrl'
  });
}])

.controller('InicioCtrl', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, WaitingFactory, EventosCancelFactory,EventosFactory,ngDialog,ClientesFactory,UsuariosFactory,DTDefaultOptions,TipoEventosFactory, TotalesFactory) {

    var vm = this;
 
       $scope.estado = 'pending';
      
      vm.getEvento = getEvento;
       vm.dtInstance = {};
       vm.dtInstanceVencer = {};
     vm.rowNewValue = rowNewValue;

     getTotalesInicio();



       vm.dtOptions = DTOptionsBuilder.fromSource('php/notificacionController.php?estado=inicio')
           .withPaginationType('full_numbers')
           .withOption('createdRow', createdRow)
            .withLanguage({
                   "sSearch": '<div class="input-group">_INPUT_<span class="input-group-addon"><i class="icon-search"></i></span></div>',
                   "sSearchPlaceholder": "Buscar...",
                   "sEmptyTable":     "No hay informacion",
                    "sInfo":           "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    "sInfoEmpty":      "No hay informacion",
                   "sInfoFiltered":   "(Mostrando de un total de  _MAX_ t)",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                   "sLoadingRecords": "Cargando...",
                  "sProcessing":     "Procesando...",
                 "sZeroRecords":    "No se encontro informacion",
                 "oPaginate": {
                                   "sFirst":    "Primer",
                                   "sLast":     "Ultimo",
                                   "sNext":     "Siguiente",
                                   "sPrevious": "Previo"
                 },
                 "oAria": {
                     "sSortAscending":  ": Activar para ordenar de forma ascendente",
                     "sSortDescending": ": Activar para ordenar de forma descentente"
                 }
               })
           .withDOM("<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-5'i><'col-md-7'p>>");
       vm.dtColumns = [
           // DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('Id').withTitle('Codigo').withClass('x'),
         DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass('x'),
         DTColumnBuilder.newColumn('Fecha').withTitle('Fecha').withClass('x'),
DTColumnBuilder.newColumn('Mensaje').withTitle('Actividad').withClass('x'),
DTColumnBuilder.newColumn('UsuarioNombre').withTitle('Usuario').withClass('x')



       ];
       ///////////////////Lleno lista notificaciones a vencer
  vm.dtOptionsVencer = DTOptionsBuilder.fromSource('php/eventosListadoDao.php?estado=1')
              .withPaginationType('full_numbers')
              .withOption('createdRow', createdRowVencer)
              .withOption("aaSorting", [[3,'asc']])
               .withLanguage({
                      "sSearch": '<div class="input-group">_INPUT_<span class="input-group-addon"><i class="icon-search"></i></span></div>',
                      "sSearchPlaceholder": "Buscar...",
                      "sEmptyTable":     "No hay informacion",
                       "sInfo":           "Mostrando _START_ a _END_ de _TOTAL_ registros",
                       "sInfoEmpty":      "No hay informacion",
                      "sInfoFiltered":   "(Mostrando de un total de  _MAX_ t)",
                       "sLengthMenu":     "Mostrar _MENU_ registros",
                      "sLoadingRecords": "Cargando...",
                     "sProcessing":     "Procesando...",
                    "sZeroRecords":    "No se encontro informacion",
                    "oPaginate": {
                                      "sFirst":    "Primer",
                                      "sLast":     "Ultimo",
                                      "sNext":     "Siguiente",
                                      "sPrevious": "Previo"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar de forma ascendente",
                        "sSortDescending": ": Activar para ordenar de forma descentente"
                    }
                  })
              .withDOM("<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-5'i><'col-md-7'p>>");
          vm.dtColumnsVencer = [
             DTColumnBuilder.newColumn('Id').withTitle('Codigo').withClass(''),
               DTColumnBuilder.newColumn('Nombre').withTitle('Nombre').withClass(''),
               DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass(''),
               DTColumnBuilder.newColumn('FechaPresentacion').withTitle('Fecha Presentacion').withClass(''),
               DTColumnBuilder.newColumn('FechaDesde').withTitle('Fecha Desde').withClass(''),
               DTColumnBuilder.newColumn('FechaHasta').withTitle('Fecha Hasta').withClass(''),
               DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget').withClass(''),
               DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)



          ];
        
          $scope.onSuccessEdited = function(data) {
               ngDialog.closeAll()
               ngDialog.open({
                   template: '<p>El evento seleccionado ha sido actualizado</p>',
                   plain: true
               });
              // alert("El evento seleccionado ha sido actualizado");
               vm.dtInstanceVencer.reloadData();
           };

              $scope.updatevento = function () {
                  EventosFactory.update($scope.evento,$scope.onSuccessEdited);

              };
          $scope.onSuccessGetEvento = function (data) {
              $scope.evento=data[0]

                    ngDialog.open({
                           template: 'evento/edit.html',
                           className: 'edicionForm ngdialog-theme-default',
                           scope:$scope
                   });
                   getUsuarios(function (){ setUsuarioCreador()});
                   getTipoEventos(function(){setTipoEvento()});

              };



function getTotalesInicio() {
 TotalesFactory.query(null,function(data) {
//$scope.inicio= JSON.parse(angular.toJson(data))

//$scope.inicio.Confirm=JSON.parse(angular.toJson(data))["Confirm"]
//var tot=JSON.parse(angular.toJson(data)
//console.log("ANG",JSON.parse(angular.toJson(data)))
var fin=JSON.parse(angular.toJson(data))

       $scope.confirm= fin[0]["Confirm"]
$scope.pending= fin[0]["Pending"]
$scope.waiting= fin[0]["Waiting"]
$scope.facturacion= Number(fin[0]["Waiting"]) + Number(fin[0]["Confirm"])

         })}

 $scope.onSuccessGetTotales = function (data) {
              console.log("DATATOTAL",data)

              };





       function rowNewValue(e, t) {
                 return e
         }
             function createdRow(row, data, dataIndex) {

                      // Recompiling so we can bind Angular directive to the DT
                      $compile(angular.element(row).contents())($scope);
                  }
                   function createdRowVencer(row, data, dataIndex) {

                             // console.log("DATAA",data.FechaPresentacion,row)
                              var dateCom=new Date(data.FechaPresentacion).getTime()
                              //var timestamp = new Date().getTime() + (2 * 24 * 60 * 60 * 1000)
                              var timestamp=new Date();
                              timestamp.setDate(timestamp.getDate() + 2);
                              var diaHoy=new Date();
                              //console.log("TIEM",timestamp,dateCom)
                              //                                      day hour  min  sec  msec

                              if(timestamp > dateCom && dateCom>diaHoy){
                                  console.log("MENOS",data.FechaPresentacion)
                                  $(row).css("font-weight","bold")


                                  // The selected time is less than 30 days from now
                              }

                            // Recompiling so we can bind Angular directive to the DT
                            $compile(angular.element(row).contents())($scope);
                        }
                        function getEvento(idEvento) {
                            EventosFactory.query({ id: idEvento },$scope.onSuccessGetEvento)

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
                                         $scope.usuarios[x].ticked = true;
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
                             for (var x in $scope.TipoEventos) {
                                 if ($scope.TipoEventos[x]["Id"]==$scope.evento["IdTipoEvento"]){
                                     $scope.TipoEventos[x].ticked = true;
                                     break;
                                 }
                             }

                         }
                        function actionsHtml(data, type, full, meta) {
                               // console.log("DATA",full,meta)
                               return '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' +
                                   '   <i class="icon-search"></i>' +
                                   '</button>&nbsp;';
                           }
});





