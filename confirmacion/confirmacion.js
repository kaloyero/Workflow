'use strict';

angular.module('myApp.confirmacion', ['ngRoute', 'datatables','ngDialog','ngMask'])


.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/confirmacion', {
        templateUrl: 'confirmacion/confirmacion.html'
    });
}])

.controller('datatableControllerConfirm', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, WaitingFactory, EventosCancelFactory,EventosFactory,ngDialog,ClientesFactory,UsuariosFactory,TipoEventosFactory,StageFactory) {
    var vm = this;
    vm.message = '';
    $scope.estado = 'confirm';

    //vm.changeState = changeState;
    vm.cancelEvent = cancelEvent;
    vm.getEvento = getEvento;
    vm.volverWaiting = volverWaiting;

    vm.cerrarEvento = cerrarEvento;

    vm.dtInstance = {};
    vm.rowNewValue = rowNewValue;
    vm.dtOptions = DTOptionsBuilder.fromSource('php/eventosListadoDao.php?estado=3')
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
        DTColumnBuilder.newColumn('Nombre').withTitle('Nombre').withClass(''),
        DTColumnBuilder.newColumn('Id').withTitle('Codigo').withClass(''),
        DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass(''),

        DTColumnBuilder.newColumn('FechaDesde').withTitle('Fecha Desde').withClass(''),
        DTColumnBuilder.newColumn('FechaHasta').withTitle('Fecha Hasta').withClass(''),
        DTColumnBuilder.newColumn('Productor').withTitle('Productor').withClass(''),
        DTColumnBuilder.newColumn('Stage').withTitle('Stage').withClass(''),

        DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget').withClass(''),

       DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)

    ];


    function volverWaiting(id, este) {
        //var nombreCodigo = $("#cambiarEstado" + id).parent().parent().find('td:eq(1)').text();
       //if (nombreCodigo == "") {
           //   ngDialog.open({
                      //  template: '<p>Campo X Obligatorio para pasar de Estado!</p>',
                      //  plain: true
                   // });
       // } else {
            var eventoEstado = new Object();
            eventoEstado["idEstado"] = 2;
            eventoEstado["idEvento"] = id;
            eventoEstado["estadoActual"] = "Confirm";

            WaitingFactory.save(eventoEstado, $scope.onSuccessChangeState);



       // }

    }

    function cancelEvent(id) {
        var eventoEstado = new Object();
        eventoEstado["idEvento"] = id;
        eventoEstado["idEstado"] = 5;

        EventosCancelFactory.update(eventoEstado, $scope.onSuccessCancel);


    }
    function cerrarEvento(id) {
         var eventoEstado = new Object();
            eventoEstado["idEstado"] = 5;
            eventoEstado["idEvento"] = id;

            WaitingFactory.save(eventoEstado, $scope.onSuccessCerrarEvento);


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
          function getProductores(callback) {
                  UsuariosFactory.query(null,function(data) {
                              $scope.productores= JSON.parse(angular.toJson(data))
                              callback();
                      } );

              }
               function setProductor(){
                      for (var x in $scope.productores) {
                          if ($scope.productores[x]["Id"]==$scope.evento["IdUsuarioProductor"]){
                              $scope.productores[x].ticked = true;
                              break;
                          }
                      }

                  }
                function getStage(callback) {
                        StageFactory.query(null,function(data) {
                                    $scope.stages= JSON.parse(angular.toJson(data))
                                    callback();
                            } );

                    }
                          function setStage(){
                                  for (var x in $scope.stages) {
                                      if ($scope.stages[x]["Id"]==$scope.evento["IdStage"]){
                                          $scope.stages[x].ticked = true;
                                          break;
                                      }
                                  }

                              }
    $scope.onSuccessCancel = function(data) {
          ngDialog.open({
                    template: '<p>El evento seleccionado ha sido cancelado</p>',
                    plain: true
            });

        vm.dtInstance.reloadData();
    };
    $scope.onSuccessChangeState = function(data) {
          vm.dtInstance.reloadData();
             ngDialog.open({
                    template: '<p>El evento seleccionado ha vuelto a la categoria de Waiting</p>',
                    plain: true
            });
    };
    $scope.onSuccessCerrarEvento = function(data) {
             vm.dtInstance.reloadData();
                ngDialog.open({
                       template: '<p>El evento seleccionado ha sido completado</p>',
                       plain: true
               });
       };
    $scope.onSuccessEdited = function(data) {
        ngDialog.closeAll()

          ngDialog.open({
                template: '<p>El evento seleccionado ha sido actualizado</p>',
                plain: true
            });
           // alert("El evento seleccionado ha sido actualizado");
            vm.dtInstance.reloadData();
    };
    $scope.onSuccessGetEvento = function (data) {
          console.log("DATAGET",data)
           $scope.evento=data[0]

           vm.dtInstance.reloadData();
               ngDialog.open({
                      template: 'evento/edit.html',
                      className: 'edicionForm ngdialog-theme-default',
                      scope:$scope
              });
              getUsuarios(function (){ setUsuarioCreador()});
              getTipoEventos(function(){setTipoEvento()});
              getStage(function(){setStage()});
              getProductores(function(){setProductor()});




         };

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
     $scope.updatevento = function () {
           EventosFactory.update($scope.evento,$scope.onSuccessEdited);

       };
    function actionsHtml(data, type, full, meta) {

if (tipoUs==1){
        return '<button title ="Cancelar Evento" class="btn btn-danger" style="padding:inherit" ng-click="lista.cancelEvent(' + data.Id + ')">' +
            '   <i class="icon-remove"></i>' +
            '</button>&nbsp;<button title ="Cerrar Evento" class="btn btn-danger cerrar" style="padding:inherit" ng-click="lista.cerrarEvento(' + data.Id + ')">' + '   <i class="glyphicon-circle_minus"></i></button>' +
                 '</button>&nbsp;' + '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' + '   <i class="icon-search"></i></button>&nbsp;'+ '<button title ="Volver a Waiting" class="btn btn-danger volver" style="padding:inherit" ng-click="lista.volverWaiting(' + data.Id + ')">' + '   <i class="icon-reply"></i></button>';
    }
if (tipoUs==2){

    return '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' + '   <i class="icon-search"></i></button>&nbsp;'




}
if (tipoUs==3){

    return ''


}


}
    function rowNewValue(e, t) {
        return e
    }
});