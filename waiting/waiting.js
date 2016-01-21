'use strict';

angular.module('myApp.waiting', ['ngRoute', 'datatables','ngDialog','ngMask'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/waiting', {
        templateUrl: 'waiting/waiting.html'
    });
}])


.controller('datatableControllerWaiting', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, WaitingFactory, EventosCancelFactory,EventosFactory,ngDialog,ClientesFactory,UsuariosFactory,TipoEventosFactory,StageFactory,RenegociarFactory) {
    var vm = this;
    vm.message = '';
    $scope.estado = 'waiting';

    vm.changeState = changeState;
    vm.cancelEvent = cancelEvent;
    vm.getEvento = getEvento;
    vm.renegociar = renegociar;



    vm.showModalPreChange = showModalPreChange;
    $scope.evento= new Object();


    vm.dtInstance = {};
    vm.rowNewValue = rowNewValue;

    // vm.dtOptions = DTOptionsBuilder.fromSource('http://www.json-generator.com/api/json/get/cnGitFLwZe?indent=2')
    vm.dtOptions = DTOptionsBuilder.fromSource('php/eventosListadoDao.php?estado=2')
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
        DTColumnBuilder.newColumn('Id').withTitle('Codigo').withClass(''),
           DTColumnBuilder.newColumn('Nombre').withTitle('Nombre').withClass(''),
           DTColumnBuilder.newColumn('RazonSocial').withTitle('Cliente').withClass(''),
        DTColumnBuilder.newColumn('Comercial').withTitle('Comercial').withClass(''),
            DTColumnBuilder.newColumn('FechaDesde').withTitle('Fecha Desde').withClass(''),
            DTColumnBuilder.newColumn('FechaHasta').withTitle('Fecha Hasta').withClass(''),
            DTColumnBuilder.newColumn('TotalBudget').withTitle('Total Budget').withClass(''),
        //DTColumnBuilder.newColumn('fechaCancelacion').withTitle('Fecha Cancelacion').withClass('editable'),
        DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)

    ];



    function changeState(id, este) {

        var fechaEvento = $("#cambiarEstado" + id).parent().parent().find('td:eq(4)').text();
        var presupuesto = $("#cambiarEstado" + id).parent().parent().find('td:eq(6)').text();
        console.log("ADAD",$("#cambiarEstado" + id).parent().parent())
        var mensaje=""
        if (fechaEvento == "0000-00-00") {
            mensaje="<p>Campo Fecha Evento Obligatorio para pasar de Estado!</p>";

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
           // var eventoEstado = new Object();
            //eventoEstado["idEstado"] = 3;
            //eventoEstado["idEvento"] = id;
            showModalPreChange(id);
            //WaitingFactory.save(eventoEstado, $scope.onSuccessChangeState);

        }

    }
    function showModalPreChange(id) {
        $scope.idEvento=id;
        getProductores(function(){getStage(function(){showModalChange(id)});});


     }
     function showModalChange(id) {

              ngDialog.open({
                     template: 'waiting/changeStage.html',
                     className: 'edicionForm ngdialog-theme-default',
                     scope:$scope
             });


       }
           $scope.renegociarEvento=function () {
                      console.log("ASDAd")
                   RenegociarFactory.update($scope.evento,$scope.onSuccessRenegociado);

               };
    $scope.saveChangeState =function () {
        console.log("SCCO",$scope)
         var eventoEstado = new Object();
         eventoEstado["idEvento"] = $scope.idEvento;
         eventoEstado["idEstado"] = 3;
         eventoEstado["IdUsuarioProductor"]=$scope.evento["Productor"][0]["Id"];
         eventoEstado["IdStage"]=$scope.evento["Stage"][0]["Id"];
         eventoEstado["estadoActual"] = "Waiting";


        WaitingFactory.save(eventoEstado, $scope.onSuccessChangeState);

     }
    function cancelEvent(id) {
        var eventoEstado = new Object();
        eventoEstado["idEvento"] = id;
        eventoEstado["idEstado"] = 5;

        EventosCancelFactory.update(eventoEstado, $scope.onSuccessCancel);
        vm.dtInstance.reloadData();

    }
      $scope.onSuccessRenegociar = function (data) {
             $scope.evento=data[0]

             vm.dtInstance.reloadData();
                 ngDialog.open({
                        template: 'waiting/renegociar.html',
                        className: 'edicionForm ngdialog-theme-default',
                        scope:$scope
                });
                getUsuarios(function (){ setUsuarioCreador()});

           };
    function getEvento(idEvento) {
        EventosFactory.query({ id: idEvento },$scope.onSuccessGetEvento)

    }
    function renegociar(idEvento) {
          EventosFactory.query({ id: idEvento },$scope.onSuccessRenegociar)

      }
      function getProductores(callback) {
              UsuariosFactory.query(null,function(data) {
                          $scope.productores= JSON.parse(angular.toJson(data))
                          callback();
                  } );

          }
            function getStage(callback) {
                    StageFactory.query(null,function(data) {
                                $scope.stages= JSON.parse(angular.toJson(data))
                                callback();
                        } );

                }
      function getUsuarios(callback) {
              UsuariosFactory.query(null,function(data) {
                          $scope.usuarios= JSON.parse(angular.toJson(data))
                          callback();
                  } );

          }
         function setUsuarioCreador(){
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
    $scope.onSuccessEdited = function(data) {
          ngDialog.open({
                template: '<p>El evento seleccionado ha sido actualizado</p>',
                plain: true
            });
            vm.dtInstance.reloadData();
    };
    $scope.onSuccessCancel = function(data) {
          ngDialog.open({
                    template: '<p>El evento seleccionado ha sido cancelado</p>',
                    plain: true
            });
     vm.dtInstance.reloadData();

    };
    $scope.onSuccessChangeState = function(data) {
        ngDialog.closeAll()

          vm.dtInstance.reloadData();
             ngDialog.open({
                    template: '<p>El evento seleccionado ha pasado a la categoria Confirm</p>',
                    plain: true
            });
    };

    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    $scope.onSuccessEdited = function(data) {
           ngDialog.closeAll()
           ngDialog.open({
               template: '<p>El evento seleccionado ha sido actualizado</p>',
               plain: true
           });
           vm.dtInstance.reloadData();
       };
       $scope.onSuccessRenegociado = function(data) {
                ngDialog.closeAll()
                ngDialog.open({
                    template: '<p>El evento seleccionado ha sido pasado a la categoria Pending</p>',
                    plain: true
                });
                vm.dtInstance.reloadData();
            };

          $scope.updatevento = function () {
              EventosFactory.update($scope.evento,$scope.onSuccessEdited);

          };


          $scope.onSuccessGetEvento = function (data) {
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
 if (tipoUs==1){
        return '<button title ="Cambiar Estado" class="btn btn-warning" id="cambiarEstado' + data.Id + '"style="padding:inherit" ng-click="lista.changeState(' + data.Id + ',this)">' +
            '   <i class="icon-arrow-up" ></i>' +
            '</button>&nbsp;' +
            '<button title ="Cancelar Evento" class="btn btn-danger" style="padding:inherit" ng-click="lista.cancelEvent(' + data.Id + ')">' +
            '   <i class="icon-remove"></i>' +
            '</button>&nbsp;' +
            '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')">' +
            '   <i class="icon-search"></i>' +
            '</button>&nbsp;'+
            '<button title ="Renegociar" class="btn btn-danger volver" style="padding:inherit" ng-click="lista.renegociar(' + data.Id + ')">' +
            '   <i class="icon-reply"></i>' +
            '</button>&nbsp;';
}
if (tipoUs==2){
     return '<button title ="Ver Evento" class="btn btn-danger search-button" style="padding:inherit" ng-click="lista.getEvento(' + data.Id + ')"><i class="icon-search"></i></button>&nbsp;'
}

    }

    function rowNewValue(e, t) {
        return e
    }
});