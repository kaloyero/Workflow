'use strict';

angular.module('myApp.clienteListado', ['ngRoute','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clienteListado', {
    templateUrl: 'cliente/listado.html',
    controller: 'ClienteListadoCtrl'
  });
}])

.controller('ClienteListadoCtrl', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, ngDialog,ClientesFactoryABM,DTDefaultOptions) {
    var vm = this;

    $scope.estado = 'clientes';
    vm.getCliente = getCliente;
    // vm.updateUsuario = updateUsuario;
    vm.dtInstance = {};

    vm.dtOptions = DTOptionsBuilder.fromSource('php/clienteController.php')
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
        DTColumnBuilder.newColumn('RazonSocial').withTitle('Razon Social').withClass(''),

        DTColumnBuilder.newColumn('Habilitado').withTitle('Habilitado').withClass(''),

       DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)


    ];
    function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }
    function getCliente(idCliente) {
       ClientesFactoryABM.query({ id: idCliente },$scope.onSuccessCliente)

    }

    function actionsHtml(data, type, full, meta) {
        // console.log("DATA",full,meta)
        var botonHabilitado="";
        //if (data.Habilitado=="S"){
            botonHabilitado='<button title ="Editar" class="btn btn-warning" id="edicion' + data.Id + '"style="padding:inherit" ng-click="lista.cambiarEstado(' + data.Id + ',this)"><i class="glyphicon-resize_small" ></i></button>'
       // }
        return '<button title ="Editar" class="btn btn-danger search-button" id="edicion' + data.Id + '"style="padding:inherit" ng-click="lista.getCliente(' + data.Id + ',this)">' +
            '   <i class="icon-search" ></i>' +
            '</button>&nbsp;'+ botonHabilitado;
    }

    $scope.onSuccessCliente = function (data) {
        console.log("DATAGET",data)
         $scope.cliente=data[0]

         vm.dtInstance.reloadData();
             ngDialog.open({
                    template: 'cliente/edit.html',
                    className: 'edicionForm ngdialog-theme-default',
                    scope:$scope
            });


       };
           $scope.onSuccessEdited = function(data) {
                    ngDialog.closeAll()
                    ngDialog.open({
                        template: '<p>El cliente seleccionado ha sido actualizado</p>',
                        plain: true
                    });
                    vm.dtInstance.reloadData();
                };
          $scope.updateCliente = function () {
                ClientesFactoryABM.update($scope.cliente,$scope.onSuccessEdited);

            };


})





