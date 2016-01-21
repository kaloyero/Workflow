'use strict';

angular.module('myApp.notificacion', ['ngRoute', 'datatables'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/notification', {
        templateUrl: 'notificacion/notificacion.html'
    });
}])


.controller('datatableControllerNotificacion', function WithAjaxCtrls($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {

    var vm = this;
    vm.dtInstance = {};

    // vm.dtOptions = DTOptionsBuilder.fromSource('http://www.json-generator.com/api/json/get/cnGitFLwZe?indent=2')
    vm.dtOptions = DTOptionsBuilder.fromSource('php/notificacionController.php')
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
DTColumnBuilder.newColumn('TipoNotificacionNombre').withTitle('Actividad').withClass('x'),
DTColumnBuilder.newColumn('UsuarioNombre').withTitle('Usuario').withClass('x')




    ];




    function createdRow(row, data, dataIndex) {
       //console.log(data)
       if (data.estado==1){
           $(row).css("font-weight","bold");
           $(row).css("color","red");
       }else if(data.estado==2){
           $(row).css("font-weight","bold");

           $(row).css("color","orange");
       }else if(data.estado==3){
           console.log("ENTRADO CONFIRM")
           $(row).css("color","green");
            $(row).css("font-weight","bold");
       }else {
           console.log("RAROS",data.estado)
       }
       if (data.Mensaje=="Cambio de estado de Waiting a Confirmado"){
           $(row).find("td:eq(3)").text("")
      $(row).find("td:eq(3)").html("<img title ='Estado de Waiting a Confim' src='http://belasoft.com.ar/workflow/img/wac.png' height='42' width='42'>")

  }
   if (data.Mensaje=="Cambio de estado de Confirm a Waiting"){
           $(row).find("td:eq(3)").text("")
     $(row).find("td:eq(3)").html('<img title ="Estado de Confirm a Waiting" src="http://belasoft.com.ar/workflow/img/caw.png" height="42" width="42">')
     }

if (data.Mensaje=="Cambio de estado de Pending a Waiting"){
           $(row).find("td:eq(3)").text("")
    $(row).find("td:eq(3)").html('<img title ="Estado de Pending a Waiting" src="http://belasoft.com.ar/workflow/img/paw.png" height="42" width="42">')
    
  }
 if (data.Mensaje=="Cambio de estado de Waiting a Pending"){
           $(row).find("td:eq(3)").text("")
 $(row).find("td:eq(3)").html('<img title ="Estado de Waiting a Pending" src="http://belasoft.com.ar/workflow/img/wap.png" height="42" width="42">')

  }
 if (data.Mensaje=="Nuevo Evento"){
           $(row).find("td:eq(3)").text("")
 $(row).find("td:eq(3)").html('<img title ="Nuevo Evento" src="http://belasoft.com.ar/workflow/img/nev.png" height="42" width="42">')

            //$(row).find("td:eq(3)").html('<a title="Nuevo Evento" class="btn btn-warning"  style="padding:inherit;pointer-events: none;">   <i class="icon-hand-up"></i></a>')
  }
//}else{ $(row).find("td:eq(3)").html(' <a title="Cambiar Estado" class="btn btn-warning"  style="padding:inherit;pointer-events: none;">   <i class="icon-hand-up"></i></a>')
  //     }
        //console.log("AAA",$(row).find("td:eq(3)").text())
       // if ($(row).find("td:eq(3)").text()!="a"){
           // $(row).css("color","red");
       // }
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

});