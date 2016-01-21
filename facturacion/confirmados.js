'use strict';

angular.module('myApp.facturacionConfirmados', ['ngRoute', 'datatables','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/facturacionConfirmados', {
        templateUrl: 'facturacion/confirmados.html'
    });
}])

.controller('datatableControllerFacturacionConfirmados', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, ngDialog,FacturacionFactory){
    var vm = this;
    vm.message = '';
    vm.dtInstance = {};
    $scope.evento = {};

    console.log("PASA")
    vm.rowNewValue = rowNewValue;
   // vm.showFacturacionPopup = showFacturacionPopup;

    vm.dtOptions = DTOptionsBuilder.fromSource('php/facturacionController.php?tipoFacturacion=confirmados')
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
        DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente'),
        DTColumnBuilder.newColumn('Nombre').withTitle('Nombre').withClass('editable'),
        DTColumnBuilder.newColumn('Codigo').withTitle('Codigo').withClass('editable'),
        DTColumnBuilder.newColumn('FechaEvento').withTitle('Fecha Evento'),
        DTColumnBuilder.newColumn(null).withTitle('Productor').notSortable(),
        DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget').withClass('editable'),
       DTColumnBuilder.newColumn(null).withTitle('Prevision'),
       DTColumnBuilder.newColumn('facturado').withTitle('Facturado'),
       DTColumnBuilder.newColumn('facturadoporcentaje').withTitle('% Facturado'),
       DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)



    ];


    $scope.addFacturacion = function (id) {

                   var eventoMonto = new Object();
                   eventoMonto["monto"] = $scope.evento["monto"];
                   eventoMonto["idEvento"] = id;
                   console.log("FINAL",eventoMonto)
                   FacturacionFactory.save(eventoMonto, $scope.onSuccessAddMonto);
       };
       $scope.onSuccessAddMonto = function(data) {
               ngDialog.open({
                     template: '<p>Monto agregado!</p>',
                     plain: true
                 });
                 //Limpio el modelo
                 $scope.evento = {};
                 //Actualizo
                 vm.dtInstance.reloadData();
         };
         $scope.cancelFacturacion = function(data) {
                    console.log("cancel facturacion")
              };
    $scope.showFacturacionPopup=function (id){

         ngDialog.openConfirm({
                template: '<form novalidate  class="form-horizontal"  name="formAlta" >'
                 +'<h4 class="sub-header">Agregar Facturacion</h4><div class="form-group">'
                 +'<label class="col-md-2 control-label" for="example-text-input">Monto  *</label>'
                 +'<div class="col-md-3"><input type="number" name="monto" ng-model="evento.monto" class="form-control" required="">'

                 +'<span style="color:red" ng-show="formAlta.$submitted || formAlta.monto.$touched">'
                 +'<span ng-show="formAlta.monto.$error.required">Requerido.</span></div></div>'

                 +'<div class="form-group"><div class="col-md-5 col-md-offset-2">'
                 +'<button type="submit" class="btn btn-primary" data-ng-disabled="!formAlta.$valid" ng-click="confirm('+id+')">'
                 +'<i class="icon-arrow-right"></i> Facturar</button>'
                 +'</div></div></form>',
                plain: true,
                scope:$scope
            })    .then(
                			function(value) {
                				$scope.addFacturacion(value);
                			},
                			function(value) {
                				//Cancel or do nothing
                			}
                		);;
    }

    function actionsHtml(data, type, full, meta) {
           return '<button title ="Cancelar Evento" class="btn btn-success" style="padding:inherit" ng-click="showFacturacionPopup(' + data.id + ')">' +
               '   <i class="icon-dollar"></i>' +
               '</button>&nbsp;<button title ="Cancelar Facturacion" class="btn btn-danger" style="padding:inherit" ng-click="cancelFacturacion(' + data.idEvento + ')">'+
               '<i class="glyphicon-circle_minus"></i></button>';

       }


    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }


    function rowNewValue(e, t) {
        return e
    }
});