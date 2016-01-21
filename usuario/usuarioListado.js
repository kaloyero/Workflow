'use strict';

angular.module('myApp.usuarioListado', ['ngRoute','ngDialog'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/usuarioListado', {
    templateUrl: 'usuario/listado.html',
    controller: 'UsuarioListadoCtrl'
  });
}])

.controller('UsuarioListadoCtrl', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder, ngDialog,UsuariosFactory,DTDefaultOptions,RolesFactory) {
    var vm = this;

    $scope.estado = 'usuarios';
    vm.getUsuario = getUsuario;
    // vm.updateUsuario = updateUsuario;
    vm.dtInstance = {};
console.log("ENTRAAAA")
    vm.dtOptions = DTOptionsBuilder.fromSource('php/usuarioController.php')
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
        DTColumnBuilder.newColumn('Nombre').withTitle('Nombre').withClass(''),
        DTColumnBuilder.newColumn('Apellido').withTitle('Apellido').withClass(''),
        DTColumnBuilder.newColumn('Email').withTitle('Email').withClass(''),
        DTColumnBuilder.newColumn('Habilitado').withTitle('Habilitado').withClass(''),

       DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable().renderWith(actionsHtml)


    ];
    function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }
    function getUsuario(idUsuario) {
        console.log("ASDAS")
       UsuariosFactory.query({ id: idUsuario },$scope.onSuccessGetUsuario)

    }

    function actionsHtml(data, type, full, meta) {
        // console.log("DATA",full,meta)
        var botonHabilitado="";
        //if (data.Habilitado=="S"){
            botonHabilitado='<button title ="Editar" class="btn btn-warning" id="edicion' + data.Id + '"style="padding:inherit" ng-click="lista.cambiarEstado(' + data.Id + ',this)"><i class="glyphicon-resize_small" ></i></button>'
       // }
        return '<button title ="Editar" class="btn btn-danger search-button" id="edicion' + data.Id + '"style="padding:inherit" ng-click="lista.getUsuario(' + data.Id + ',this)">' +
            '   <i class="icon-search" ></i>' +
            '</button>&nbsp;';
    }

    $scope.onSuccessGetUsuario = function (data) {
        console.log("DATAGET",data)
         $scope.usuario=data[0]

         vm.dtInstance.reloadData();
             ngDialog.open({
                    template: 'usuario/edit.html',
                    className: 'edicionForm ngdialog-theme-default',
                    scope:$scope
            });
            getRoles(function (){ setRol()});


       };
           $scope.onSuccessEdited = function(data) {
                    ngDialog.closeAll()
                    ngDialog.open({
                        template: '<p>El usuario seleccionado ha sido actualizado</p>',
                        plain: true
                    });
                    vm.dtInstance.reloadData();
                };
          $scope.updateUsuario = function () {
                UsuariosFactory.update($scope.usuario,$scope.onSuccessEdited);

            };

              function getRoles(callback){
                    RolesFactory.query(null,function(data) {
                                  $scope.roles= JSON.parse(angular.toJson(data))
                                  callback();
                               ;
                          } );

                }
                function setRol(){
                       for (var x in $scope.roles) {
                           if ($scope.roles[x]["Id"]==$scope.usuario["IdRol"]){

                               $scope.roles[x].ticked = true;
                               break;
                           }
                       }

                   }

})





