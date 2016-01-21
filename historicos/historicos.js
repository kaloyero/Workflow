

'use strict';

angular.module('myApp.historicos', ['ngRoute', 'datatables','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/historicos', {
        templateUrl: 'historicos/historicos.php'
    });
}])

.controller('datatableControllerHistoricos', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, WaitingFactory, EventosCancelFactory,EventosFactory,ngDialog,ClientesFactory,UsuariosFactory,DTDefaultOptions,TipoEventosFactory) {
    var vm = this;
    $scope.estado = 'historico';
     vm.getEvento = getEvento;
    vm.dtInstance = {};
  vm.rowNewValue = rowNewValue;


    vm.dtOptions = DTOptionsBuilder.fromSource('php/eventosHistoricosDao.php?estado=1')
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
        DTColumnBuilder.newColumn('TotalFacturado').withTitle('Total Facturado').withClass(''),


        DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)

    ];




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



    function actionsHtml(data, type, full, meta) {



return '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' +
            '   <i class="icon-search"></i>' +
            '</button>&nbsp;';




            }
    function rowNewValue(e, t) {
           return e
       }


});