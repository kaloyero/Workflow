'use strict';

angular.module('myApp.facturacionPrevistos', ['ngRoute', 'datatables','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/facturacion', {
        templateUrl: 'facturacion/previstos.html'
    });
}])

.controller('datatableControllerFacturacionPrevistos', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, ngDialog,WaitingFactory,EventosFactory,TipoEventosFactory,UsuariosFactory,FacturacionFactory) {
    var vm = this;
    vm.message = '';
    vm.dtInstance = {};
    vm.dtInstanceConfirmado = {};
    vm.rowNewValue = rowNewValue;
    vm.eventoFinalizado = eventoFinalizado;
    vm.finalizarFacturacion = finalizarFacturacion;

    vm.getEvento = getEvento;
    $scope.evento = {};




    vm.dtOptions = DTOptionsBuilder.fromSource('php/facturacionController.php?tipoFacturacion=previsto')
        .withPaginationType('full_numbers')
     //   .withOption('fnDrawCallback', rowCallback)
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
            DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass(''),
            DTColumnBuilder.newColumn('Nombre').withTitle('Evento').withClass(''),
            DTColumnBuilder.newColumn('FechaDesde').withTitle('Desde').withClass(''),
            DTColumnBuilder.newColumn('FechaHasta').withTitle('Hasta').withClass(''),	
            DTColumnBuilder.newColumn('Comercial').withTitle('Comercial').withClass(''),	
            DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget ($)').withClass(''),
			DTColumnBuilder.newColumn('Prevision').withTitle('Prevision ($)').withClass(''),
            DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtmlPrevistos)


    ];

    vm.dtOptionsConfirmado = DTOptionsBuilder.fromSource('php/facturacionController.php?tipoFacturacion=confirmado')
        .withPaginationType('full_numbers')
     //   .withOption('fnDrawCallback', rowCallback)
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
    vm.dtColumnsconfirmado = [
        // DTColumnBuilder.newColumn('id').withTitle('ID'),
           DTColumnBuilder.newColumn('Id').withTitle('Codigo').withClass(''),
            DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass(''),
            DTColumnBuilder.newColumn('Nombre').withTitle('Evento').withClass(''),
            DTColumnBuilder.newColumn('FechaDesde').withTitle('Desde').withClass(''),
            DTColumnBuilder.newColumn('FechaHasta').withTitle('Hasta').withClass(''),			
            DTColumnBuilder.newColumn('Productor').withTitle('Productor').withClass(''),
            DTColumnBuilder.newColumn('Comercial').withTitle('Comercial').withClass(''),						
            DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget ($)').withClass(''),
			DTColumnBuilder.newColumn('Prevision').withTitle('Prevision ($)').withClass(''),
            DTColumnBuilder.newColumn('TotalCancelado').withTitle('Total Cancelado ($)').withClass(''),
			DTColumnBuilder.newColumn('PorcentajeCancelado').withTitle('Ptj Cancelado (%)').withClass(''),
            DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)


    ];







   function getEvento(idEvento) {
        EventosFactory.query({ id: idEvento },$scope.onSuccessGetEvento)

    }
    $scope.onSuccessGetEvento = function (data) {
           console.log("DATAGET",data)
            $scope.evento=data[0]

           // vm.dtInstance.reloadData();
                ngDialog.open({
                       template: 'evento/editRead.html',
                       className: 'edicionForm ngdialog-theme-default',
                       scope:$scope
               });
               getUsuarios(function (){ setUsuarioCreador()});
               getTipoEventos(function(){setTipoEvento()});

          };


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


 function eventoFinalizado(id, este) {

        var eventoEstado = new Object();
         eventoEstado["idEstado"] = 5;
         eventoEstado["idEvento"] = id;

         WaitingFactory.save(eventoEstado, $scope.onSuccessChangeState);

 }
function finalizarFacturacion(id, este) {

        var eventoEstado = new Object();
         eventoEstado["idEstado"] = 6;
         eventoEstado["idEvento"] = id;

         WaitingFactory.save(eventoEstado, $scope.onSuccessFinalizar);

 }

$scope.addFacturacion = function (id) {
     console.log("FINAL",$scope.evento)

                var eventoMonto = new Object();
                eventoMonto["monto"] = $scope.evento["monto"];
                eventoMonto["idEvento"] = id;
                eventoMonto["descripcion"] = $scope.evento["descripcion"];
		eventoMonto["fecha"] = $scope.evento["fecha"];
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
              vm.dtInstanceConfirmado.reloadData();
      };

 $scope.showFacturacionPopup=function (id){

      ngDialog.openConfirm({
             template: '<form novalidate  class="form-horizontal"  name="formAlta" >'
              +'<h4 class="sub-header">Agregar Facturacion</h4><div class="form-group">'
              +'<label class="col-md-2 control-label" for="example-text-input">Monto  *</label>'
              +'<div class="col-md-3"><input type="number" name="monto" ng-model="evento.monto" class="form-control" required="">'

              +'<span style="color:red" ng-show="formAlta.$submitted || formAlta.monto.$touched">'
              +'<span ng-show="formAlta.monto.$error.required">Requerido.</span></div></div>'
              +'<div class="form-group"><label class="col-md-2 control-label" for="example-datepicker">Fecha * </label>'
              +'<div class="col-md-3">'
              +'<input type="text"  name="fecha" ng-model="evento.fecha" class="form-control input-datepickerFacturacion '
              +'text-center" data-date-format="mm/dd/yy" placeholder="dd/mm/yyyy" required>'
              +'<span style="color:red" ng-show="formAlta.$submitted || formAlta.fecha.$touched">'
              +'<span ng-show="formAlta.fecha.$error.required">Requerido.</span></div></div><div class="form-group">'
              +'<label class="col-md-2 control-label" for="example-textarea-input">Descripcion</label>'
              +'<div class="col-md-5"><textarea id="example-textarea-input" name="example-textarea-input" ng-model="evento.descripcion"'
              +'rows="4" class="form-control" placeholder=""  maxlength="100"></textarea></div></div>'
              +'<div class="form-group"><div class="col-md-5 col-md-offset-2">'
              +'<button type="submit" class="btn btn-primary" data-ng-disabled="!formAlta.$valid" ng-click="confirm('+id+')">'
              +'<i class="icon-arrow-right"></i> Facturar</button>'
              +'</div></div></form><script>var today = new Date();$(".input-datepickerFacturacion").datepicker({format: "dd-mm-yyyy", startDate: today'
              +'})</script>',
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



 $scope.onSuccessChangeState = function(data) {
     vm.dtInstanceConfirmado.reloadData();
      ngDialog.open({
             template: '<p>El evento seleccionado ha pasado a la categoria Cancelado</p>',
             plain: true
     });
 };

 $scope.onSuccessFinalizar = function(data) {
     vm.dtInstanceConfirmado.reloadData();
      ngDialog.open({
             template: '<p>El evento seleccionado ha pasado a la categoria Finalizado</p>',
             plain: true
     });
 };


    function actionsHtml(data, type, full, meta) {

if (tipoUs==3) {
return '';
}
if (tipoUs==1) {
 return '<button title="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">   <i class="icon-search"></i></button>&nbsp;<button title ="Agregar Facturacion" class="btn btn-success" style="padding:inherit" ng-click="showFacturacionPopup(' + data.Id + ')">' +
                 '   <i class="icon-dollar"></i>' +
                 '</button>&nbsp;<button title ="Cancelar Facturacion" class="btn btn-danger" style="padding:inherit" ng-click="lista.eventoFinalizado(' + data.Id + ')">'+
                 '<i class="glyphicon-circle_minus"></i></button></button>&nbsp;<button title ="Finalizar Facturacion" class="btn btn-danger" style="padding:inherit" ng-click="lista.finalizarFacturacion(' + data.Id + ')"><i class="icon-ban-circle"></i></button>';
}

if (tipoUs==2) {
 return '<button title="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">   <i class="icon-search"></i></button>&nbsp;'
}
    

         }

  function actionsHtmlPrevistos(data, type, full, meta) {

 if (tipoUs!=3) {
             return '<button title="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">   <i class="icon-search"></i></button>';
}else{
    return '';
}

         }




    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }


    function rowNewValue(e, t) {
        return e
    }
});