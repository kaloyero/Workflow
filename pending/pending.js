

'use strict';

angular.module('myApp.pending', ['ngRoute', 'datatables','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/pending', {
        templateUrl: 'pending/pendingview.php'
    });
}])

.controller('datatableControllerPending', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, WaitingFactory, EventosCancelFactory,EventosFactory,ngDialog,ClientesFactory,UsuariosFactory,DTDefaultOptions,TipoEventosFactory) {
    var vm = this;
    $scope.estado = 'pending';
    vm.changeState = changeState;
    vm.cancelEvent = cancelEvent;
     vm.getEvento = getEvento;
    vm.dtInstance = {};
  vm.rowNewValue = rowNewValue;


    vm.dtOptions = DTOptionsBuilder.fromSource('php/eventosListadoDao.php?estado=1')
        .withPaginationType('full_numbers')
        //.withOption('fnDrawCallback', rowCallback)
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
        DTColumnBuilder.newColumn('Id').withTitle('Codigo').withClass(''),
        DTColumnBuilder.newColumn('Nombre').withTitle('Nombre').withClass(''),
        DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass(''),
        DTColumnBuilder.newColumn('FechaPresentacion').withTitle('Fecha Presentacion').withClass(''),
        DTColumnBuilder.newColumn('FechaDesde').withTitle('Fecha Desde').withClass(''),
        DTColumnBuilder.newColumn('FechaHasta').withTitle('Fecha Hasta').withClass(''),
        DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget').withClass(''),
        DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)

    ];

  function changeState(id, este) {
      console.log("ID",id)
        var fechaPresentacion = $("#cambiarEstado" + id).parent().parent().find('td:eq(3)').text();
        var fechaDesde = $("#cambiarEstado" + id).parent().parent().find('td:eq(4)').text();
        var fechaHasta = $("#cambiarEstado" + id).parent().parent().find('td:eq(5)').text();

        var presupuesto = $("#cambiarEstado" + id).parent().parent().find('td:eq(6)').text();
          var mensaje=""
            if (fechaPresentacion == "0000-00-00") {
                mensaje="<p>Campo Fecha Presentacion Obligatorio para pasar de Estado!</p>";

            }
            if (fechaDesde == "0000-00-00") {
                mensaje="<p>Campo Fecha Desde Obligatorio para pasar de Estado!</p>";

            }
            if (fechaHasta == "0000-00-00") {
                mensaje="<p>Campo Fecha Hasta Obligatorio para pasar de Estado!</p>";

            }
            if (presupuesto == ""||presupuesto==0) {
                mensaje+="<p>Campo Presupuesto Obligatorio para pasar de Estado!</p>";

            }
            if (mensaje!=""){
                     ngDialog.open({
                                template: mensaje,
                                plain: true
                        });
            }else {
            var eventoEstado = new Object();
            eventoEstado["idEstado"] = 2;
            eventoEstado["idEvento"] = id;
            eventoEstado["estadoActual"] = "Pending";

            WaitingFactory.save(eventoEstado, $scope.onSuccessChangeState);

        }

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

    function cancelEvent(id) {
        var eventoEstado = new Object();
        eventoEstado["idEvento"] = id;
        eventoEstado["idEstado"] = 5;

        EventosCancelFactory.update(eventoEstado, $scope.onSuccessCancel);


    }
    function createdRow(row, data, dataIndex) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
      }
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

       };

    $scope.onSuccessCancel = function(data) {
           vm.dtInstance.reloadData();
             ngDialog.open({
                    template: '<p>El evento seleccionado ha sido cancelado</p>',
                    plain: true
            });
        vm.dtInstance.reloadData();

    };

    $scope.onSuccessChangeState = function(data) {
        vm.dtInstance.reloadData();
         ngDialog.open({
                template: '<p>El evento seleccionado ha pasado a la categoria Waiting</p>',
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

       $scope.updatevento = function () {
           EventosFactory.update($scope.evento,$scope.onSuccessEdited);

       };



    function actionsHtml(data, type, full, meta) {
        // console.log("DATA",full,meta)
console.log("VAR SIMPLE",simple)
var botones="";

if (tipoUs==1){
return '<button title ="Cambiar Estado" class="btn btn-warning" id="cambiarEstado' + data.Id + '"style="padding:inherit" ng-click="lista.changeState(' + data.Id + ',this)">' +
            '   <i class="icon-arrow-up" ></i>' +
            '</button>&nbsp;' +
            '<button title ="Cancelar Evento" class="btn btn-danger" style="padding:inherit" ng-click="lista.cancelEvent(' + data.Id + ')">' +
            '   <i class="icon-remove"></i>' +
            '</button>&nbsp;' +
            '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' +
            '   <i class="icon-search"></i>' +
            '</button>&nbsp;';
}
if (tipoUs ==2){
return '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' +
            '   <i class="icon-search"></i>' +
            '</button>&nbsp;';

}




            }
    function rowNewValue(e, t) {
           return e
       }


});